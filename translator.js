/**
 * This module retrieves strings from the corresponding JSON files
 */

/*** Configuration ***/
const TRANSLATIONS_PATH = 'content/'; // relative path to the translation files
const ATTRIBUTE_NAME = 'it4u_lng'; // HTML attribute name to identify elements to translate
const DEFAULT_FILE = 'general.json'; // default translation file
const FALLBACK_LANGUAGE = 'en'; // fallback language in case the specified language is not found
const LANGUAGES = ['en', 'de']; // languages that you have configured translations for

/*** Global variables ***/
let it4u_lng = {
    language: (navigator.language || navigator.userLanguage).split('-')[0],
    translations: {},
    translations_loaded: false,
    files_read: [],
}

/**
 * This method retrieves the translation for the given parameter.
 * @param param The parameter to retrieve the translation for
 * @returns {*|boolean} The translation or false if not found
 */
function t(param) {
    if (!LANGUAGES.includes(it4u_lng.language)) {
        it4u_lng.language = FALLBACK_LANGUAGE;
    }

    let keys = param.split(':').join('.').split('.');
    keys.unshift(it4u_lng.language);
    let path = getPathFromParam(param);

    // Check if the file has already been read
    if (!it4u_lng.files_read.includes(path)) {
        it4u_lng.files_read.push(path);
        addToTranslations(path);
    }

    // Retrieve the translation
    let translation = findTranslation(it4u_lng.translations, keys);

    // Check if the translation exists
    if (!translation) {
        console.log('Translation for "' + param + '" not found!');
        return false;
    } else {
        return translation;
    }
}

/* ------------------------- Initialization ------------------------- */

/**
 * This method loads the translations for the given language.
 * @param language The language to load the translations for
 */
function loadTranslations(language = null) {
    if (!language && !it4u_lng.translations_loaded) {
        // Pass the default language
    } else if (language !== it4u_lng.language || !it4u_lng.translations_loaded) {
        // Pass the specified language
        it4u_lng.language = language;
    } else {
        return;
    }

    // Iterate over all elements with the translation attribute
    let elements = document.querySelectorAll(`[${ATTRIBUTE_NAME}]`);
    for (let i = 0; i < elements.length; i++) {
        let param = elements[i].getAttribute(ATTRIBUTE_NAME);
        elements[i].innerHTML = t(param);
    }
}

/* ------------------------- Helper functions ------------------------- */

/**
 * This method retrieves the path from a given parameter.
 * @param param The parameter to retrieve the path from
 * @returns {string} The path to the JSON file
 */
function getPathFromParam(param) {
    // Dissecting the param
    if (param.includes(':')) {
        param = param.split(':');
        param.pop()
    } else {
        param = DEFAULT_FILE.split('/');
    }

    // Constructing the path
    let path = TRANSLATIONS_PATH.split('/');
    path.push(it4u_lng.language);
    path.push.apply(path, param);
    path = path.filter(Boolean).join('/');

    // Adding the file extension
    if (!path.endsWith('.json')) {
        path = path.concat('.json');
    }

    return path
}

/**
 * This method adds a translation to the global translations object.
 */
function addToTranslations(path) {
    let translation = readJSON(path);

    if (translation) {
        let file = (path.split('/').pop().split('.').shift()).toString();

        if (DEFAULT_FILE.includes(file)) {
            // If the translations object is not yet populated, initiate it
            if (!it4u_lng.translations[it4u_lng.language]) {
                it4u_lng.translations[it4u_lng.language] = {};
            }
            it4u_lng.translations[it4u_lng.language] = Object.assign(it4u_lng.translations[it4u_lng.language], translation);
        } else {
            it4u_lng.translations[it4u_lng.language][file] = translation;
        }
    } else {
        console.log('File "' + path + '" not found!');
    }
}

/**
 * This method reads a JSON file and returns its content.
 * @param path The path of the JSON file
 * @returns {any} The content of the JSON file
 */
function readJSON(path) {
    let request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send(null)
    if (request.status === 404) {
        return false;
    } else {
        return JSON.parse(request.responseText);
    }
}

/**
 * This method recursively retrieves a translation from a nested object.
 * @param object The object to search in
 * @param keys The keys to search for
 * @returns {boolean|boolean|*} The translation or false if not found
 */
function findTranslation(object, keys) {
    if (keys.length === 0 || !(keys[0] in object)) {
        return false;
    } else {
        if (keys.length >= 1 && typeof object[keys[0]] === 'object') {
            return findTranslation(object[keys[0]], keys.slice(1));
        } else {
            return object[keys[0]];
        }
    }
}
