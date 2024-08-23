import { Settings } from "./settings-class";

class SettingsConfig {
    settings : Settings

    constructor() {
        this.settings = new Settings();

        this.settings.retrieve().then((s) => {
            this.settings = s;
        });
    }

    saveSettings = async (e: Event) : Promise<void> => {
        e.preventDefault();
        let saveBtn = document.querySelector("#btnSaveSettings") as HTMLButtonElement;

        this.settings.defaultChildCommentVisibility = (<HTMLSelectElement>document.getElementById("sbDefaultChildCommentVisibility")).value;
        this.settings.enableKeyboardNav = (<HTMLInputElement>document.getElementById("cbKeyboardNavigation")).checked;

        await browser.storage.sync.set({
            settings: this.settings
        });

        saveBtn.disabled = true;
        saveBtn.innerText = 'Saved!';
        setTimeout(() => {
            saveBtn.disabled = false;
            saveBtn.innerText = 'Save';
        }, 1100);
    }

    restoreOptions = async () : Promise<void> => {
        this.settings.retrieve();

        console.log(this.settings);
        (<HTMLSelectElement>document.getElementById("sbDefaultChildCommentVisibility")).value = this.settings.defaultChildCommentVisibility;
        (<HTMLInputElement>document.getElementById("cbKeyboardNavigation")).checked = this.settings.enableKeyboardNav;
    }
}

let settingsConfig = new SettingsConfig();

document.addEventListener("DOMContentLoaded", settingsConfig.restoreOptions);
document.querySelector("form")!.addEventListener("submit", settingsConfig.saveSettings);