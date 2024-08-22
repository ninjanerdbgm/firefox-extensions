export class Settings {    
    defaultChildCommentVisibility: string;
    enableKeyboardNav: boolean;

    constructor();
    constructor(
        defaultChildCommentVisibility?: string, 
        enableKeyboardNav?: boolean
    ) {
        this.defaultChildCommentVisibility = defaultChildCommentVisibility || "show";
        this.enableKeyboardNav = enableKeyboardNav || true;
    }

    get = () : Settings => {    
        return this;
    }

    set = async (
        defaultChildCommentVisibility?: string, 
        enableKeyboardNav?: boolean
    ) : Promise<void> => {        
        this.defaultChildCommentVisibility = defaultChildCommentVisibility == null ? this.defaultChildCommentVisibility : defaultChildCommentVisibility;
        this.enableKeyboardNav = enableKeyboardNav == null ? this.enableKeyboardNav : enableKeyboardNav;

        await browser.storage.sync.set({
            settings: {
                defaultChildCommentVisibility: this.defaultChildCommentVisibility,
                enableKeyboardNav: this.enableKeyboardNav
            }            
        });
    }

    retrieve = async () : Promise<Settings> => {
        let settings = await browser.storage.sync.get('settings');
        
        if (typeof settings !== 'undefined' && typeof settings.settings !== 'undefined') {
            await this.set(
                settings.settings.defaultChildCommentVisibility,
                settings.settings.enableKeyboardNav
            );            
        } else {        
            await this.set(
                undefined, 
                undefined
            );
        }

        return this.get();
    }
}