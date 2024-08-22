import { CommentCollapser } from "./comment-collapser";
import { KeyboardNavigation } from "./keyboard-nav";

function ready(fn: (() => void)): void {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

async function loadPlugins() : Promise<void> {
    let commentCollapser = new CommentCollapser();
    let keyboardNav = new KeyboardNavigation();

    await commentCollapser.init();
    await keyboardNav.init();
}

ready(async () => {
    await loadPlugins();
});