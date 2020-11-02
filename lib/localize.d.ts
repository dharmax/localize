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
 * @param input
 * @param namespace the namespace to use.
 */
export declare function localize(input: string | number, namespace?: string): string;
/**
 * Localize all tags marked with the "localize" attribute.
 * Note that if the page, or the part under the rootElement changes, the method should be called again.
 * @param rootElement starting point to check
 * @param namespace the namespace to use. A 'localize' attribute can also denotes the namespace.
 */
export declare function localizeTags(rootElement?: Element, namespace?: string): void;
