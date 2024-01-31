# it4u_lng

Lightweight vanilla JS internalization-framework inspired by i18next.
Take a look at the ```index.html``` file for a working example.

The contents of this repository are licensed under the MIT software license. For more information, please refer to the LICENSE file or visit https://opensource.org/licenses/MIT.

## Getting Started

There are no dependencies.
Just include the script in your HTML file.
Set the relative path correctly.

```html
<script src="path/to/translator.js"></script>
```

Take a look inside the ```translator.js``` file and change the configuration to your needs.

```JS
/*** Configuration ***/
const TRANSLATIONS_PATH = 'content/'; // relative path to the translation files
const ATTRIBUTE_NAME = 'it4u_lng'; // HTML attribute name to identify elements to translate
const DEFAULT_FILE = 'general.json'; // default translation file
const FALLBACK_LANGUAGE = 'en'; // fallback language in case the specified language is not found
const LANGUAGES = ['de', 'en']; // languages that you have configured translations for
```

The module expects a folder structure similar to this:

```
|--- content (TRANSLATIONS_PATH)
    |--- de
        |--- general.json
        |--- footer.json
        |--- ...
    |--- en
        |--- general.json
        |--- footer.json
        |--- ...
    |--- ...
```

## Referencing

Any translation reference is specified like ```<file_name>:<key>.<nested_key>```.
If you don't specify a file, the default file is referenced.
The expression can take an unlimited number of nested keys, it just depends on how you structure your translation files.

## Functions

### loadTranslations()

Translates all elements with the specified attribute name.

Params: ```language``` (string) (optional, otherwise fallback language is used)

Usage example:

```html
<p it4u_lng="title"></p>
<p it4u_lng="sentences.sentence1"></p>
<p it4u_lng="footer:copyright"></p>

<script>
    // load translations for all elements
    loadTranslations(language='en');
</script>
```

### t()

Retrieves a translation for a given reference.

Params: ```param``` (string) containing the reference

Usage example:

```html
<script>
    // get translation for reference
    let translation = t('sentences.sentence1');
    console.log(translation);
</script>
```

## Feedback

This repository is meant for demonstration purposes only and is not targeted for collaboration. Still, we greatly
appreciate any feedback and ideas to enhance our offer. Please direct your inquiries
to [info@it-for-you.com](mailto:info@it-for-you.com).

Check out our newest projects and talk to us!

- [GitHub](https://github.com/IT-for-you)
- [LinkedIn](https://linkedin.com/company/it-for-you/)
- [Instagram](https://www.instagram.com/it.for.you/)
- [Website](https://it-for-you.com)

© 2017-2024 | IT for you


