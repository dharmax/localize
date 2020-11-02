/**
 * Display console warning on missing template
 */
export let warningOn = false;
/**
 * Marks missing templates on the screen
 */
export let markMissing = true;
let dictionary;
/**
 * Set active dictionary
 * @param locale locale name
 * @param dictionary_ the dictionary
 */
export function setDictionary(locale, dictionary_) {
    window.currentLocale = locale;
    dictionary = compileDictionary(dictionary_);
    document.body.style.direction = (locale in ['he', 'ar']) ? 'rtl' : 'ltr';
}
/**
 * Localize the given string/template
 * @param input
 * @param namespace the namespace to use.
 */
export function localize(input, namespace) {
    if (!input)
        return '';
    if (typeof input === "number")
        return input.toString();
    if (!isNaN(parseInt(input)))
        return input;
    const { fields, normalizedTemplate } = normalizeTemplate(input);
    // find the localization template in the provided namespace and if it is not found there, try in the default
    //  namespace
    let targetTemplate = dictionary[namespace || '*'][normalizedTemplate] || dictionary['*'][normalizedTemplate];
    if (!targetTemplate) {
        warningOn && console.warn('String template without localization: ' + input);
        markMissing && (targetTemplate = '!' + input);
    }
    // render a new string from the template
    return render('' + targetTemplate, fields);
}
/**
 * Localizes the content of a single tag
 * @param element the html node
 * @param namespace the namespace to use. A 'localize' attribute can also denotes the namespace.
 */
function localizeTag(element, namespace) {
    var _a;
    const attr = (_a = element.getAttribute('localize')) === null || _a === void 0 ? void 0 : _a.toString();
    namespace = namespace || attr && attr.length > 0 && attr || '*';
    // @ts-ignore
    element.orgTemplate || (element.orgTemplate = element.textContent);
    // @ts-ignore
    element.textContent = localize(element.orgTemplate, namespace);
}
/**
 * Localize all tags marked with the "localize" attribute.
 * Note that if the page, or the part under the rootElement changes, the method should be called again.
 * @param rootElement starting point to check
 * @param namespace the namespace to use. A 'localize' attribute can also denotes the namespace.
 */
export function localizeTags(rootElement = document.body, namespace) {
    const nodes = rootElement.querySelectorAll("[localize]");
    nodes.forEach(n => localizeTag(n, namespace));
}
/**
 *
 * @param template the string to translate
 * @param fields the list of replacements
 */
function render(template, fields) {
    let result = template;
    if (fields)
        for (let [fieldName, val] of Object.entries(fields)) {
            result = result.replace(fieldName, val);
        }
    return result;
}
setDictionary('en', {});
function compileDictionary(dictionary) {
    if (!dictionary['*'])
        dictionary['*'] = {};
    const result = {};
    for (let [nsName, namespace] of Object.entries(dictionary)) {
        result[nsName] = {};
        for (let [s, t] of Object.entries(namespace)) {
            const { fields, normalizedTemplate } = normalizeTemplate(s);
            const reversedFields = reverseFields(fields);
            const target = render(t, reversedFields);
            result[nsName][normalizedTemplate] = target;
        }
    }
    return result;
    function reverseFields(fields) {
        const result = {};
        for (let [k, v] of Object.entries(fields))
            // @ts-ignore
            result['#' + v + '#'] = k;
        return result;
    }
}
function normalizeTemplate(orgString) {
    // make orgString template-compatible and build replacement table in fields
    const fields = {};
    const fieldsInSource = orgString.match(/#(.*?)#/g);
    for (let i in fieldsInSource) {
        const n = parseInt(i);
        const key = `#${n + 1}#`;
        const str = fieldsInSource[n];
        fields[key] = str.substr(1, str.length - 2);
        orgString = orgString.replace(str, key);
    }
    return { fields, normalizedTemplate: orgString.toLowerCase() };
}
