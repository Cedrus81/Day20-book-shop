'use strict'

function init() {
    gBooks = loadFromStorage(STORAGE_KEY) || createBooks()
    // _initByQueryStringParams()
    renderPagination()
    renderBooks()
}

function onAddBook() {
    var elModal = new bootstrap.Modal(document.querySelector('#myModal'), {
        keyboard: false
    })
    setModalAdd(elModal._element)
    elModal.show()
    doTranslate()
}

function _onSubmitBook(event) {
    event.preventDefault()
    const title = document.querySelector('form input[name=title]').value
    const price = document.querySelector('form input[name=price]').value
    const rating = document.querySelector('form input[name=rating]').value
    addBook(title, +price, +rating)
    renderBooks()
}

function _onRead(bookId) {
    if (!bookId) return
    var elModal = new bootstrap.Modal(document.querySelector('#myModal'), {
        keyboard: false
    })
    readBook(bookId, elModal._element)
    elModal.show()
    doTranslate()
}

function onCloseModal() {
    event.stopPropagation()
    var elModal = new bootstrap.Modal(document.querySelector('#myModal'), {
        keyboard: false
    })
    elModal.hide()
    setQueryStringParams()
}

function onRate(bookId, change) {
    let book = getBookById(bookId)
    updateRate(book, change)
    document.querySelector('.input-group-text').innerHTML = book.rating
}

function _onUpdate(bookId) {
    var elModal = new bootstrap.Modal(document.querySelector('#myModal'), {
        keyboard: false
    })
    setModalUpdate(elModal._element, bookId)
    elModal.show()
    doTranslate()
}

function _onSubmitUpdate(event, bookId) {
    event.preventDefault()
    const title = document.querySelector('form input[name=title]').value
    const price = +document.querySelector('form input[name=price]').value
    updateBook(bookId, price, title)
    renderBooks()
}

function _onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function _onFilterByPrice(maxPrice) {
    setPriceFilter(+maxPrice)
    renderBooks()
}

function _onFilterByRating(minRating) {
    setRatingFilter(+minRating)
    renderBooks()
}

function _onSetFilterByTxt(text) {
    setTextFilter(text)
    renderBooks()
}

function _initByQueryStringParams() {
    const queryStringParams = getQueryStringParams()
    setLayoutByQueryStringParams(queryStringParams)
    renderLayoutSwitchByQueryStringParams(queryStringParams)

    const filterBy = setFilterByQueryStringParams(queryStringParams)
    renderFiltersByQueryStringParams(filterBy)
    gFilterBy = filterBy
    _onRead(queryStringParams.get('read'))

    let lang = queryStringParams.get('lang')
    onSetLang(lang)
    renderLangSelectByQueryString(lang)
}

function _onSwitchDisplay(isCards) {
    setDisplay(isCards) // on services/views.js
    renderBooks()
}

function _onSortBy(elTd) {
    let sortMethod = elTd.getAttribute('data-sort')
    sortMethod = sortBooks(sortMethod)

    elTd.setAttribute('data-sort', sortMethod)
    renderSortTitle(elTd)
    renderBooks()
}

function onNavigate(elBtn) {
    let newValue = +elBtn.getAttribute('data-page')
    if (elBtn.classList.contains('active') || elBtn.classList.contains('disabled')) return
    setPage(newValue)
    renderPagination()
    activateButton(newValue)
    renderBooks()
}

function onSetLang(lang) {
    if (!lang) return
    setLang(lang)
    setDirection(lang)
    renderBooks()
    setQueryStringParams()
    doTranslate()
}

