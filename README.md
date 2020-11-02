# Just Localize!
**TL;DR** : just call `localizeTags` in your page and all tags marked with 'localize' attribute
will be translated!  

## Install
`npm install just-localize`

## API documentation
[Full API documentation](./api.md)

*Note that there's a TypeScript declaration file, too.*
 

## General
This tiny library help you add support for multiple language to your site.
 


# example      
See full example in a single web-page under the example directory. No need for a server to run it.
 
 ```
<html>
  <label localize>There are #32# people here</label>
</html> 
 ```
```
<script>
 
    const dictionaries = {
        en: {
            '*': {
                'there are #xxx# people here': 'There are #xxx# people here'
            }
        },
        he: {
            '*': {
                'there are #1# people here': 'יש פה #1# אנשים'
            }
        }
    }

   setDictionary(locale, dictionaries['he'])
   localizeTags()
</script>
```
 

# License
This library provided as-is, with absolutely no guarantee. Enjoy, support, etc, in
short, it's [ISC](https://opensource.org/licenses/ISC).

# Support me
I'd be happy to receive a star for example, or a little donation.... 
  

```
