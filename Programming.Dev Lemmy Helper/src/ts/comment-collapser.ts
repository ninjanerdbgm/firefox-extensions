import { Settings } from "./settings.class";

export class CommentCollapser {
    settings : Settings

    constructor() {
        this.settings = new Settings();
    }


    init = async () : Promise<void> => {
        await this.settings.retrieve();

        const commentElements = document.querySelectorAll('article[id^="comment-"]');

        commentElements.forEach(async (el) => {
            if (document.querySelector(`#btnShowHideComments-${el.id.split("comment-")[1]}`) != null) return;

            const childComments : HTMLElement = el.nextSibling as HTMLElement;

            if (childComments !== null) {
                const buttonRow = el.querySelector('.comment-bottom-btns') as HTMLDivElement;
                const downvoteButton = buttonRow.querySelector('[aria-label="Downvote"]') as HTMLButtonElement;   
                let showHideCommentButton : HTMLButtonElement = document.createElement('button') as HTMLButtonElement;
                    showHideCommentButton.classList.add('btn', 'btn-link', 'text-muted', 'py-0', 'kn0w-text-link');
                    showHideCommentButton.addEventListener('click', (e) => {
                        this.hideShowChildComments(e);
                    });     
                    showHideCommentButton.id = `btnShowHideComments-${el.id.split("comment-")[1]}`;     
                    
                if (this.settings.defaultChildCommentVisibility == 'hide') {    
                    childComments.classList.add("d-none");
                }

                if (childComments.classList.contains('d-none')) {       
                    showHideCommentButton.setAttribute('aria-label', 'Show Child Comments');
                    showHideCommentButton.innerText = `Show Child Comments (${childComments.childNodes.length})`;

                    downvoteButton.insertAdjacentElement('afterend', showHideCommentButton);
                } else {
                    showHideCommentButton.setAttribute('aria-label', 'Hide Child Comments');
                    showHideCommentButton.innerText = "Hide Child Comments";

                    downvoteButton.insertAdjacentElement('afterend', showHideCommentButton);
                }
            }
        });
    }

    hideShowChildComments = (el : Event) : void => {
        if (el.target === null) {
            return;
        }

        let targElement : HTMLElement = el.target as HTMLElement;

        const label : string = targElement.getAttribute("aria-label") as string;

        if (label === null || typeof label === 'undefined') {
            return;
        }

        let targ : HTMLButtonElement = document.querySelector(`#${targElement.id}`) as HTMLButtonElement;
        let sibling : HTMLElement = targElement.parentNode!.parentNode!.parentNode!.nextSibling as HTMLElement;
        if (sibling != null) {
            if (label.indexOf("Hide") > -1) {
                sibling.classList.add("d-none");
                targ.innerText = `Show Child Comments (${sibling.childNodes.length})`;
                targ.setAttribute("aria-label", "Show Child Comments");
                // Collapse children as well
                sibling.querySelectorAll('ul.comments:not(.d-none)').forEach((sib) => {
                    sib.classList.add("d-none");
                    let sibBtn : HTMLButtonElement = sibling.querySelector('[id^="btnShowHideComments"]') as HTMLButtonElement;
                    if (sibBtn != null) {
                        sibBtn.innerText = `Show Child Comments (${sibling.childNodes.length})`;
                        sibBtn.setAttribute("aria-label", "Show Child Comments");
                    }
                });
            } else {
                sibling.classList.remove("d-none");
                targ.innerText = "Hide Child Comments";
                targ.setAttribute("aria-label", "Hide Child Comments");
            }
        }
    }
}