import { currentLanguage, is_str, Locales, mergeLocales, setLanguage, string, strings } from "./utils.js";

export interface LanguageProps {
    readonly t: typeof string
    readonly isValidStr: typeof is_str
}

let languageLoaded = false;

export function storeLocale(locales: Locales) {
    mergeLocales(locales);
    changeLanguage(currentLanguage());
}

export async function changeLanguage(language: string) {
    await setLanguage(language);

    languageLoaded = true;
    for (const listener of listeners) {
        listener(strings);
    }
}

const listeners: Array<(t: typeof strings) => void> = [];

export function subscribe(cb: typeof listeners[0]) {
    listeners.push(cb);
}
export function unsubscribe(cb: typeof listeners[0]) {
    listeners.splice(listeners.indexOf(cb)>>>0, 1);
}

export function broadcast() {
    
}
