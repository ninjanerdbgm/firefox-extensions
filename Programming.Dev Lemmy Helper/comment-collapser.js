ready(function() {
    generateShowHideCommentsLinks();
    
    document.addEventListener("scroll", () => {
        generateShowHideCommentsLinks();
    });
});

function ready(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

function generateShowHideCommentsLinks() {
    const commentElements = document.querySelectorAll('article[id^="comment-"]');

    commentElements.forEach((el) => {
        if (document.querySelector(`#btnShowHideComments-${el.id.split("comment-")[1]}`) != null) return;

        const childComments = el.nextSibling;

        if (childComments !== null) {
            const buttonRow = el.querySelector('.comment-bottom-btns');
            const downvoteButton = buttonRow.querySelector('[aria-label="Downvote"]');        

            if (childComments.classList.contains('d-none')) {       
                let showHideCommentButton = document.createElement('button');
                    showHideCommentButton.classList.add('btn', 'btn-link', 'text-muted', 'py-0', 'kn0w-text-link');
                    showHideCommentButton.addEventListener('click', (e) => {
                        hideShowChildComments(e);
                    });     
                showHideCommentButton.id = `btnShowHideComments-${el.id.split("comment-")[1]}`;
                showHideCommentButton.setAttribute('aria-label', 'Show Child Comments');
                showHideCommentButton.innerText = "Show Child Comments";

                downvoteButton.insertAdjacentElement('afterend', showHideCommentButton);
            } else {
                let showHideCommentButton = document.createElement('button');
                    showHideCommentButton.classList.add('btn', 'btn-link', 'text-muted', 'py-0', 'kn0w-text-link');
                    showHideCommentButton.addEventListener('click', (e) => {
                        hideShowChildComments(e);
                    });     
                showHideCommentButton.id = `btnShowHideComments-${el.id.split("comment-")[1]}`;
                showHideCommentButton.setAttribute('aria-label', 'Hide Child Comments');
                showHideCommentButton.innerText = "Hide Child Comments";

                downvoteButton.insertAdjacentElement('afterend', showHideCommentButton);
            }
        }
    });
}

function hideShowChildComments(el, id) {
    if (el.target === null) {
        return;
    }

    const label = el.target.ariaLabel;

    if (label === null || typeof label === 'undefined') {
        return;
    }

    if (label.indexOf("Hide") > -1) {
        let targ = document.querySelector(`#${el.target.id}`);
        targ.parentNode.parentNode.parentNode.nextSibling.classList.add("d-none");
        targ.innerText = "Show Child Comments";
        targ.setAttribute("aria-label", "Show Child Comments");
    } else {
        let targ = document.querySelector(`#${el.target.id}`);
        targ.parentNode.parentNode.parentNode.nextSibling.classList.remove("d-none");
        targ.innerText = "Hide Child Comments";
        targ.setAttribute("aria-label", "Hide Child Comments");
    }
}