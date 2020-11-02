## Members

<dl>
<dt><a href="#warningOn">warningOn</a></dt>
<dd><p>Display console warning on missing template</p>
</dd>
<dt><a href="#markMissing">markMissing</a></dt>
<dd><p>Marks missing templates on the screen</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#setDictionary">setDictionary(locale, dictionary_)</a></dt>
<dd><p>Set active dictionary</p>
</dd>
<dt><a href="#localize">localize(input, namespace)</a></dt>
<dd><p>Localize the given string/template</p>
</dd>
<dt><a href="#localizeTag">localizeTag(element, namespace)</a></dt>
<dd><p>Localizes the content of a single tag</p>
</dd>
<dt><a href="#localizeTags">localizeTags(rootElement, namespace)</a></dt>
<dd><p>Localize all tags marked with the &quot;localize&quot; attribute.
Note that if the page, or the part under the rootElement changes, the method should be called again.</p>
</dd>
<dt><a href="#render">render(template, fields)</a></dt>
<dd></dd>
</dl>

<a name="warningOn"></a>

## warningOn
Display console warning on missing template

**Kind**: global variable  
<a name="markMissing"></a>

## markMissing
Marks missing templates on the screen

**Kind**: global variable  
<a name="setDictionary"></a>

## setDictionary(locale, dictionary_)
Set active dictionary

**Kind**: global function  

| Param | Description |
| --- | --- |
| locale | locale name |
| dictionary_ | the dictionary |

<a name="localize"></a>

## localize(input, namespace)
Localize the given string/template

**Kind**: global function  

| Param | Description |
| --- | --- |
| input |  |
| namespace | the namespace to use. |

<a name="localizeTag"></a>

## localizeTag(element, namespace)
Localizes the content of a single tag

**Kind**: global function  

| Param | Description |
| --- | --- |
| element | the html node |
| namespace | the namespace to use. A 'localize' attribute can also denotes the namespace. |

<a name="localizeTags"></a>

## localizeTags(rootElement, namespace)
Localize all tags marked with the "localize" attribute.
Note that if the page, or the part under the rootElement changes, the method should be called again.

**Kind**: global function  

| Param | Description |
| --- | --- |
| rootElement | starting point to check |
| namespace | the namespace to use. A 'localize' attribute can also denotes the namespace. |

<a name="render"></a>

## render(template, fields)
**Kind**: global function  

| Param | Description |
| --- | --- |
| template | the string to translate |
| fields | the list of replacements |

