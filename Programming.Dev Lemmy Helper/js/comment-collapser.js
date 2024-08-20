let ext;

ready(function() {
    const getSettings = async() => {
        savedSettings = await browser.storage.sync.get('settings');
    }

    getSettings().then(() => {
        ext = savedSettings;
        loadPlugins();
    }).catch(err => {        
        console.log('Unable to load Programming.dev Lemmy Helper settings. Using defaults...');
        ext.settings = {
            defaultChildCommentVisibility: 'show',
            enableKeyboardNav: true          
        };
        loadPlugins();
    }).finally(() => {
        document.addEventListener("scroll", () => {
            generateShowHideCommentsLinks();
        });
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
            let showHideCommentButton = document.createElement('button');
                showHideCommentButton.classList.add('btn', 'btn-link', 'text-muted', 'py-0', 'kn0w-text-link');
                showHideCommentButton.addEventListener('click', (e) => {
                    hideShowChildComments(e);
                });     
                showHideCommentButton.id = `btnShowHideComments-${el.id.split("comment-")[1]}`;     
                        
            if (ext.settings.defaultChildCommentVisibility == 'hide') {    
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

function hideShowChildComments(el) {
    if (el.target === null) {
        return;
    }

    const label = el.target.ariaLabel;

    if (label === null || typeof label === 'undefined') {
        return;
    }

    let targ = document.querySelector(`#${el.target.id}`);
    let sibling = targ.parentNode.parentNode.parentNode.nextSibling;
    if (label.indexOf("Hide") > -1) {
        sibling.classList.add("d-none");
        targ.innerText = `Show Child Comments (${sibling.childNodes.length})`;
        targ.setAttribute("aria-label", "Show Child Comments");
        // Collapse children as well
        sibling.querySelectorAll('ul.comments:not(.d-none)').forEach((sib) => {
            sib.classList.add("d-none");
            let sibBtn = sibling.querySelector('[id^="btnShowHideComments"]');
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

function trigger(el, eventType) {
    if (typeof eventType === 'string' && typeof el[eventType] === 'function') {
        el[eventType]();
    } else {
        const event =
        typeof eventType === 'string'
            ? new Event(eventType, {bubbles: true})
            : eventType;
        el.dispatchEvent(event);
    }
}

function loadPlugins() {    
    // Comment Collapser
    generateShowHideCommentsLinks();

    // Keyboard Nav
    initKeyboardNav();
}