import { Settings } from "./settings-class";
import { trigger, isInteractableElement } from "./utils";

export class KeyboardNavigation {
    settings : Settings

    constructor() {
        this.settings = new Settings();
    }

    init = async () : Promise<void> => {
        document.addEventListener('keypress', async (kp) => {
            await this.settings.retrieve();
            if (this.settings.enableKeyboardNav) {
                if (window.location.href.indexOf('/post/') > -1 || window.location.href.indexOf('/comment/') > -1) {
                    let activeElement : HTMLElement = document.activeElement as HTMLElement;
                    if (activeElement != null && !isInteractableElement(activeElement)) {
                        switch (kp.key) {
                            case 'j':
                            case 'J':
                                this.moveDown();
                                break;
                            case 'k':
                            case 'K':
                                this.moveUp();
                                break;
                            case 'M':
                            case 'm':
                                this.toggleCommentVisibility();
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        });
    }
    
    moveDown = () : void => {
        let currentComment = this.getSelectedComment();    
        if (currentComment == null || typeof currentComment === 'undefined') {
            currentComment = this.getVisibleComments()[0];
            currentComment.classList.add("kn0w-highlight-comment");
        } else {
            let visibleComments = this.getVisibleComments();
            let currentIndex = visibleComments.findIndex((e) => e == currentComment);
    
            if (currentIndex + 1 < visibleComments.length) {
                currentComment.classList.remove("kn0w-highlight-comment");
                currentComment = visibleComments[currentIndex+1];
                currentComment.classList.add("kn0w-highlight-comment");
                currentComment.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
            } else {
                // Reached bottom. Scroll back to top:
                currentComment.classList.remove("kn0w-highlight-comment");
                currentComment = visibleComments[0];
                currentComment.classList.add("kn0w-highlight-comment");
                currentComment.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
            }  
        }
    }
    
    moveUp = () : void => {
        let currentComment = this.getSelectedComment();    
        if (currentComment != null && typeof currentComment !== 'undefined') {
            let visibleComments = this.getVisibleComments();
            let currentIndex = visibleComments.findIndex((e) => e == currentComment);
    
            if (currentIndex - 1 >= 0) {
                currentComment.classList.remove("kn0w-highlight-comment");
                currentComment = visibleComments[currentIndex-1];
                currentComment.classList.add("kn0w-highlight-comment");
                currentComment.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
            }
        }
    }
    
    toggleCommentVisibility = () : void => {
        let currentComment = this.getSelectedComment();
        if (currentComment != null && currentComment.parentNode != null) {
            let btn = currentComment.parentNode.querySelector('[id^="btnShowHideComments"]') as HTMLButtonElement;
            if (btn != null && typeof btn !== 'undefined') {
                trigger(btn, 'click');
            }
        } 
    }
    
    getVisibleComments = () : Array<HTMLDivElement> => {
        return [...document.querySelectorAll('ul.comments:not(.d-none) > li.comment > article > div > div.comment-content')] as Array<HTMLDivElement>;
    }
    
    getSelectedComment = () : HTMLDivElement => {
        return document.querySelector('ul.comments:not(.d-none) > li.comment > article > div > div.comment-content.kn0w-highlight-comment') as HTMLDivElement;
    }
}