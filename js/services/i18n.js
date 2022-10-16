'use strict'
var gCurrLang = 'eng'
var gTranslate = {
    title: {
        eng: 'Denisse\'s Library',
        esp: 'La librería de Denisse',
        he: 'הספרייה של דניס'
    },
    'loading': {
        eng: 'Loading...',
        esp: 'Cargando...',
        he: '...טוען'
    },
    'lorem': {
        eng: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quisquam illo ea quaerat maxime molestiae numquam impedit delectus
        doloribus aliquid dolorum aut blanditiis, iste hic architecto, libero incidunt.
            Laborum, quod natus.`,
        esp: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quisquam illo ea quaerat maxime molestiae numquam impedit delectus
        doloribus aliquid dolorum aut blanditiis, iste hic architecto, libero incidunt.
            Laborum, quod natus.`,
        he: `רם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית נולום ארווס סאפיאן - פוסיליס קוויס,
         אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרק - וענוף לפרומי בלוף קינץ תתיח לרעח.לו`
    },
    'btn-add': {
        eng: 'Add',
        esp: 'Añadir',
        he: 'הוסף'
    },
    'read': {
        eng: 'Info',
        esp: 'Info',
        he: 'מידע'
    },
    'update': {
        eng: 'Update',
        esp: 'Actualizar',
        he: 'עדכן'
    },
    'delete': {
        eng: 'Delete',
        esp: 'Borrar',
        he: 'מחק'
    },
    'yes': {
        eng: 'yes',
        esp: 'Sí',
        he: 'כן'
    },
    'no': {
        eng: 'no',
        esp: 'no',
        he: 'לא'
    },
    'delete-warning': {
        eng: 'Are you sure you want to delete this book?',
        esp: 'Está seguro sobre borrar este libro?',
        he: '?האם אתם בטוחים שברצונכם למחוק את הספר'
    },
    language: {
        eng: 'Language',
        esp: 'Idioma',
        he: 'שפה'
    },
    filter: {
        eng: 'Filter',
        esp: 'Filtrar',
        he: 'סנן'
    },
    'rate-this-book': {
        eng: 'Rate this Book:',
        esp: 'Clasifica este libro:',
        he: 'דרגו את הספר'
    },
    'table-display': {
        eng: 'Table display',
        esp: 'Exposición de tabla',
        he: 'תצוגת טבלה'
    },
    'cards-display': {
        eng: 'Cards display',
        esp: 'Exposición de tarjetas',
        he: 'תצוגת קלפים'
    },
    'th-title': {
        eng: 'Title:',
        esp: 'Título:',
        he: 'שם'
    },
    'th-price': {
        eng: 'Price',
        esp: 'Precio',
        he: 'מחיר'
    },
    'th-options': {
        eng: 'Options',
        esp: 'Opciónes',
        he: 'אפשרויות'
    },
    'th-id': {
        eng: 'ID',
        esp: 'Código',
        he: 'קוד'
    },
    'btn-close-modal': {
        eng: 'Close',
        esp: 'Cerrar',
        he: 'סגור'
    },
    'menu-display': {
        eng: 'Display:',
        esp: 'Exposición:',
        he: 'תצוגה'
    },
    'menu-rating': {
        eng: 'Min. rating:',
        esp: 'Ratings mínimos:',
        he: ':דירוג מינימאלי'
    },
    'menu-price': {
        eng: 'Max. Price',
        esp: 'Precio máximo',
        he: 'מחיר מירבי'
    },
    'read-description': {
        eng: 'Description',
        esp: 'Descripción',
        he: 'תיאור'
    },
    'read-price': {
        eng: 'Price in retail:',
        esp: 'Precio de venta al público:',
        he: 'מחיר לצרכן'
    },
    'menu-text-filter-placeholder': {
        eng: 'Search',
        esp: 'Bֹúsqueada',
        he: 'חיפוש'
    },
    'add-book-header': {
        eng: 'Add a new Book',
        esp: 'Añade un nuevo libro',
        he: 'הוסף ספר חדש'
    },
    'pagination-first': {
        eng: '\u00ab',
        esp: '\u00ab',
        he: '\u00bb'
    },
    'pagination-last': {
        eng: '\u00bb',
        esp: '\u00bb',
        he: '\u00ab'
    },
}

function setLang(lang) {
    gCurrLang = lang
}

function setDirection(lang) {
    const elBody = document.querySelector('body')
    lang === 'he' ? elBody.classList.add('rtl') : elBody.classList.remove('rtl')
}

function doTranslate() {
    const els = document.querySelectorAll('[data-trans]')
    for (const el of els) {
        const transKey = el.dataset.trans
        el.innerText = getTranslate(transKey)
        if (el.placeholder) el.placeholder = getTranslate(transKey)
    }
}

function getTranslate(key) {
    const transVal = gTranslate[key]
    if (!transVal) return gTranslate[key].en

    return transVal[gCurrLang]
}

function formatCurrency(bookPrice) {
    switch (gCurrLang) {
        case 'he':
            bookPrice = Math.floor(bookPrice * 3.55)
            return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(bookPrice)

        case 'esp':
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(bookPrice)

        case 'eng':
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(bookPrice)

    }
}