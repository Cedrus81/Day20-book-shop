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
    'btn-read': {
        eng: 'Info',
        esp: 'Info',
        he: 'מידע'
    },
    'btn-update': {
        eng: 'Update',
        esp: 'Actualizar',
        he: 'עדכן'
    },
    'btn-delete': {
        eng: 'Delete',
        esp: 'Borrar',
        he: ''
    },
    'th-title': {
        eng: 'Title',
        esp: 'Título',
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
        eng: 'Book ID',
        esp: 'Código',
        he: 'קוד ספר'
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
    'menu-text-filter-placeholder': {
        eng: 'Search',
        esp: 'Bֹúsqueada',
        he: 'חיפוש'
    }
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
        if (el.placeholder) el.placeholder = trans
    }
}

function getTranslate(key) {
    const transVal = gTranslate[key]
    if (!transVal) return 'UNKNOWN'

    return transVal[gCurrLang]
}