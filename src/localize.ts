export type Language = string
/**
 * Display console warning on missing template
 */
export let warningOn = false

/**
 * Marks missing templates on the screen
 */
export let markMissing = true

let dictionary: Dictionary


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
export type Dictionary = { [namespace: string]: { [logical: string]: string } }

/**
 * Set active dictionary
 * @param locale locale name
 * @param dictionary_ the dictionary
 */
export function setDictionary(locale: Language, dictionary_: Dictionary) {
    window.currentLocale = locale
    dictionary = compileDictionary(dictionary_)
    document.body.style.direction = (locale in ['he', 'ar']) ? 'rtl' : 'ltr'
}

/**
 * Localize the given string/template
 * @param input
 * @param namespace the namespace to use.
 */
export function localize(input: string | number, namespace?: string): string {

    if (!input)
        return ''
    if (typeof input === "number")
        return input.toString()
    if (!isNaN(parseInt(input)))
        return input

    const {fields, normalizedTemplate} =  normalizeTemplate(input);

    // find the localization template in the provided namespace and if it is not found there, try in the default
    //  namespace
    let targetTemplate = dictionary[namespace || '*'][normalizedTemplate] || dictionary['*'][normalizedTemplate]

    if (!targetTemplate) {
        warningOn && console.warn('String template without localization: ' + input)
        markMissing && (targetTemplate = '!' + input)
    }

    // render a new string from the template
    return render('' + targetTemplate, fields)
}

/**
 * Localizes the content of a single tag
 * @param element the html node
 * @param namespace the namespace to use. A 'localize' attribute can also denotes the namespace.
 */
function localizeTag(element: Element, namespace?: string) {
    const attr = element.getAttribute('localize')?.toString()
    namespace = namespace || attr && attr.length > 0 && attr || '*'
    // @ts-ignore
    element.orgTemplate || (element.orgTemplate = element.textContent)
    // @ts-ignore
    element.textContent = localize(element.orgTemplate, namespace)
}

/**
 * Localize all tags marked with the "localize" attribute.
 * Note that if the page, or the part under the rootElement changes, the method should be called again.
 * @param rootElement starting point to check
 * @param namespace the namespace to use. A 'localize' attribute can also denotes the namespace.
 */
export function localizeTags(rootElement: Element = document.body, namespace?: string) {

    const nodes = rootElement.querySelectorAll("[localize]")
    nodes.forEach(n => localizeTag(n, namespace))
}

/**
 *
 * @param template the string to translate
 * @param fields the list of replacements
 */
function render(template: string, fields: { [fieldName: string]: string }): string {
    let result = template
    if (fields) for (let [fieldName, val] of Object.entries(fields)) {
        result = result.replace(fieldName, val)
    }
    return result
}

declare let window: any

setDictionary('en', {})

function compileDictionary( dictionary:Dictionary):Dictionary {

    if (!dictionary['*'])
        dictionary['*'] = {}
    return dictionary

    const result:Dictionary = {}

    for ( let [s,t] of Object.entries(dictionary)) {
        const {fields, normalizedTemplate} = normalizeTemplate(s)
        const target = render( t, fields)

    }
    return result
}

function normalizeTemplate(orgString: string ) {
    // make orgString template-compatible and build replacement table in fields
    const fields: { [k: string]: string } = {}
    const fieldsInSource = orgString.match(/#(.*?)#/g)
    for (let i in fieldsInSource) {
        const n = parseInt(i)
        const key = `#${n + 1}#`
        const str = fieldsInSource[n];
        fields[key] = str.substr(1, str.length - 2)
        orgString = orgString.replace(str, key)
    }
    return {fields, normalizedTemplate: orgString.toLowerCase()}
}
