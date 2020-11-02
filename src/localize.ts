
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
    dictionary = dictionary_
    document.body.style.direction = (locale in ['he', 'ar']) ? 'rtl' : 'ltr'
}

/**
 * Localize the given string/template
 * @param orgString
 * @param namespace the namespace to use
 */
export function localize(orgString: string | number, namespace = '*'): string {

    if (!orgString)
        return ''
    if (typeof orgString === "number")
        return orgString.toString()
    if (!isNaN(parseInt(orgString)))
        return orgString

    const fields: { [k: string]: string } = {}

    // make orgString template-compatible and build re-placement table in fields
    const fieldsInSource = orgString.match(/#(.*?)#/g)
    for (let i in fieldsInSource) {
        const n = parseInt(i)
        const key = `#${n + 1}#`
        const str = fieldsInSource[n];
        fields[key] = str.substr(1, str.length - 2)
        orgString = orgString.replace(str, key)
    }

    // find the localization template and if not found, mark it and report it
    let localizedTemplate = dictionary[namespace][orgString.toLowerCase()]
    if (!localizedTemplate) {
        warningOn && console.warn('String template without localization: ' + orgString)
        markMissing && (localizedTemplate = '!' + orgString)
    }

    // render a new string from the template
    return render('' + localizedTemplate, fields)
}

/**
 * Localizes the content of a tag
 * @param n the html node
 * @param namespace the namespace to use
 */
function localizeTag(n: Element, namespace = '*') {
    // @ts-ignore
    n.textContent = localize(n.textContent)
}

/**
 * Localize all tags marked with the "localize" attribute.
 * Note that this function is good just for static stuff. Otherwise, do it dynamically (in JS)
 * @param root starting point to check
 */
export function localizeTags(root: Element = document.body, namespace: string = '*') {

    const nodes = root.querySelectorAll("[localize]")
    nodes.forEach(n => localizeTag(n, namespace))
}

/**
 *
 * @param template the string to translate
 * @param fields the list of replacements
 */
function render(template:string, fields:{[fieldName:string]:string}): string {
    let result = template
    if (fields) for (let [fieldName,val] of Object.entries(fields)) {
        result = result.replace(fieldName, val)
    }
    return result
}

declare let window: any

setDictionary('en', {})
