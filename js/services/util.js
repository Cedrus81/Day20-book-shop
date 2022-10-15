'use strict'
const NAMES_KEY = 'bookNamesDB'
var gBookNames

// form Validation
(function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

function getBookById(bookId) {
    return gBooks.find(book => book.id === bookId)
}

function makeId(length = 5) {
    var txt = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return txt;
}

function GetRandomBookTitle() {
    return `Harry Potter and The ${_getBookTitle()}`
}

function _getBookTitle() {
    gBookNames = loadFromStorage(NAMES_KEY)
    if (!gBookNames) {
        let bookNames = [
            'Aerial Shoe',
            'B-Movie Cold',
            `Bartender's Execution`,
            `Chocolate Time`,
            `Death Eater's Garlic`,
            `Deck of the Jockey`,
            `Defender of Algebra`,
            `Elf's Coffee`,
            `Grimoire of the Coach`,
            `Notepad of Infinity`,
            `Platinum of Knitting`,
            `Shadowy Concrete`,
            `Stone Partying`,
            `Stuck-up Singer`,
            `Surfboard of Ravenclaw`,
            `Amazon of Tea`,
            `Annoying Ice`,
            `Buried Sock`,
            `Cabbage of the Singer`,
            `Crystal Tricycle`,
            `Desecrated Stocking`,
            `Elf's Broccoli`,
            `Fuzzy-Wuzzy Deck`,
            `Heavy-Metal Ice`,
            `Milkmaid of the Flame`,
            `Prisoner's Halitosis`,
            `Soldier of Bureaucracy`,
            `Steel Irritation`,
            `Streetsweeper's Savagery`,
            `Underwear of Lemuria`,
        ]
        gBookNames = bookNames
    }
    return gBookNames[Math.floor(Math.random() * gBookNames.length)]
}

function getRandomIntFrom1(max = 100) {
    return Math.ceil(Math.random() * max)
}

function getQueryStringParams() {
    return new URLSearchParams(window.location.search)
}

function enableArrows(lastPage) {
    // debugger
    let elNavs = document.querySelectorAll('.pagination:scope > *')
    for (const nav of elNavs) {
        if (+nav.getAttribute('data-page') < 0 || +nav.getAttribute('data-page') > lastPage) {
            nav.classList.add('disabled')
        }
        else {
            nav.classList.remove('disabled')
        }
    }
    // let elNext = document.querySelector('.arrows button[value="1"]')
    // let elPrev = document.querySelector('.arrows button[value="-1"]')
    // if (gPageIndex === 0) {
    //     elPrev.disabled = true
    // }
    // if (gPageIndex === lastPage) {
    //     elNext.disabled = true
    // }
    // if (gPageIndex !== 0 && gPageIndex !== lastPage) {
    //     elPrev.disabled = false
    //     elNext.disabled = false
    // }
}
