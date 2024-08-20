async function saveSettings(e) {
    e.preventDefault();
    let saveBtn = document.querySelector("#btnSaveSettings");

    await browser.storage.sync.set({
        settings: {
            defaultChildCommentVisibility: document.getElementById("sbDefaultChildCommentVisibility").value,
            enableKeyboardNav: document.getElementById("cbKeyboardNavigation").checked
        }
    });

    saveBtn.disabled = true;
    saveBtn.innerText = 'Saved!';
    setTimeout(() => {
        saveBtn.disabled = false;
        saveBtn.innerText = 'Save';
    }, 1100);
}

async function restoreOptions() {
    let ext = await browser.storage.sync.get('settings');

    if (typeof (ext) !== 'undefined' && typeof (ext.settings) !== 'undefined') {
        document.getElementById("sbDefaultChildCommentVisibility").value = ext.settings.defaultChildCommentVisibility || "show";
        document.getElementById("cbKeyboardNavigation").checked = ext.settings.enableKeyboardNav || false;
    }
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveSettings);