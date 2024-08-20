function initKeyboardNav() {
    document.addEventListener('keypress', (kp) => {
        if (window.location.href.indexOf('/post/') > -1 || window.location.href.indexOf('/comment/') > -1) {
            if (typeof document.activeElement.type === 'undefined' || document.activeElement.type == "div") {
                switch (kp.key) {
                    case 'j':
                    case 'J':
                        moveDown();
                        break;
                    case 'k':
                    case 'K':
                        moveUp();
                        break;
                    case 'M':
                    case 'm':
                        toggleCommentVisibility();
                        break;
                    default:
                        break;
                }
            }
        }
    });
}

function moveDown() {
    let currentComment = getSelectedComment();    
    if (currentComment == null || typeof currentComment === 'undefined') {
        currentComment = getVisibleComments()[0];
        currentComment.classList.add("kn0w-highlight-comment");
    } else {
        let visibleComments = getVisibleComments();
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

function moveUp() {
    let currentComment = getSelectedComment();    
    if (currentComment != null && typeof currentComment !== 'undefined') {
        let visibleComments = getVisibleComments();
        let currentIndex = visibleComments.findIndex((e) => e == currentComment);

        if (currentIndex - 1 >= 0) {
            currentComment.classList.remove("kn0w-highlight-comment");
            currentComment = visibleComments[currentIndex-1];
            currentComment.classList.add("kn0w-highlight-comment");
            currentComment.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        }
    }
}

function toggleCommentVisibility() {
    let currentComment = getSelectedComment();
    if (currentComment != null && typeof currentComment !== 'undefined') {
        let btn = currentComment.parentNode.querySelector('[id^="btnShowHideComments"]');
        if (btn != null && typeof btn !== 'undefined') {
            trigger(btn, 'click');
        }
    } 
}

function getVisibleComments() {
    return [...document.querySelectorAll('ul.comments:not(.d-none) > li.comment > article > div > div.comment-content')];
}

function getSelectedComment() {
    return document.querySelector('ul.comments:not(.d-none) > li.comment > article > div > div.comment-content.kn0w-highlight-comment');
}