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
<dt><a href="#localize">localize(orgString, namespace)</a></dt>
<dd><p>Localize the given string/template</p>
</dd>
<dt><a href="#localizeTag">localizeTag(n, namespace)</a></dt>
<dd><p>Localizes the content of a tag</p>
</dd>
<dt><a href="#localizeTags">localizeTags(root)</a></dt>
<dd><p>Localize all tags marked with the &quot;localize&quot; attribute.
Note that this function is good just for static stuff. Otherwise, do it dynamically (in JS)</p>
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

## localize(orgString, namespace)
Localize the given string/template

**Kind**: global function  

| Param | Description |
| --- | --- |
| orgString |  |
| namespace | the namespace to use |

<a name="localizeTag"></a>

## localizeTag(n, namespace)
Localizes the content of a tag

**Kind**: global function  

| Param | Default | Description |
| --- | --- | --- |
| n |  | the html node |
| namespace | <code>*</code> | the namespace to use |

<a name="localizeTags"></a>

## localizeTags(root)
Localize all tags marked with the "localize" attribute.
Note that this function is good just for static stuff. Otherwise, do it dynamically (in JS)

**Kind**: global function  

| Param | Description |
| --- | --- |
| root | starting point to check |

<a name="render"></a>

## render(template, fields)
**Kind**: global function  

| Param | Description |
| --- | --- |
| template | the string to translate |
| fields | the list of replacements |

