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
                let showCommentButton = document.createElement('button');
                showCommentButton.classList.add('btn');
                showCommentButton.classList.add('btn-link');
                showCommentButton.classList.add('text-muted');
                showCommentButton.classList.add('py-0');
                showCommentButton.classList.add('kn0w-text-link');
                hideCommentButton.id = `btnShowHideComments-${el.id.split("comment-")[1]}`;
                showCommentButton.setAttribute('aria-label', 'Show Child Comments');
                showCommentButton.innerText = "Show Child Comments";
                showCommentButton.addEventListener('click', (e) => {
                    hideShowChildComments(e);
                });     

                downvoteButton.insertAdjacentElement('afterend', showCommentButton);
            } else {
                let hideCommentButton = document.createElement('button');
                hideCommentButton.classList.add('btn');
                hideCommentButton.classList.add('btn-link');
                hideCommentButton.classList.add('text-muted');
                hideCommentButton.classList.add('py-0');
                hideCommentButton.classList.add('kn0w-text-link');
                hideCommentButton.id = `btnShowHideComments-${el.id.split("comment-")[1]}`;
                hideCommentButton.setAttribute('aria-label', 'Hide Child Comments');
                hideCommentButton.innerText = "Hide Child Comments";
                hideCommentButton.addEventListener('click', (e) => {
                    hideShowChildComments(e);
                });

                downvoteButton.insertAdjacentElement('afterend', hideCommentButton);
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