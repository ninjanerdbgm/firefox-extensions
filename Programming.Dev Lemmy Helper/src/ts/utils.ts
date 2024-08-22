export const trigger = (el : HTMLElement, eventType : string) : void => {
    const event =
        typeof eventType === 'string'
            ? new Event(eventType, {bubbles: true})
            : eventType;
    el.dispatchEvent(event);
}

export const isInteractableElement = (e: HTMLElement) : boolean => {
    if (e instanceof HTMLInputElement || 
        e instanceof HTMLTextAreaElement || 
        e instanceof HTMLSelectElement) {
        return true;
    
    }
    return false;
}