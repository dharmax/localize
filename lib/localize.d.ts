export declare type Language = string;
/**
 * Display console warning on missing template
 */
export declare let warningOn: boolean;
/**
 * Marks missing templates on the screen
 */
export declare let markMissing: boolean;
/**
 *
 * Dictionary has namespaces, where the namespace "*" is the default one, that is looked into when the looked-for template
 * is not found in the provided namespace.
 *
 * Each namespace is a simple map of a logical-template to target template. Fields within the templates are marked with
 * "#". A dictionary example:
 * { '*': {
 *     'There are #peopleCount# people in the room': 'Currently, only #peopleCount# are in the room'
 * }}
 *
 */
export declare type Dictionary = {
    [namespace: string]: {
        [logical: string]: string;
    };
};
/**
 * Set active dictionary
 * @param locale locale name
 * @param dictionary_ the dictionary
 */
export declare function setDictionary(locale: Language, dictionary_: Dictionary): void;
/**
 * Localize the given string/template
 * @param orgString
 * @param namespace the namespace to use
 */
export declare function localize(orgString: string | number, namespace?: string): string;
/**
 * Localize all tags marked with the "localize" attribute.
 * Note that this function is good just for static stuff. Otherwise, do it dynamically (in JS)
 * @param root starting point to check
 */
export declare function localizeTags(root?: Element, namespace?: string): void;
