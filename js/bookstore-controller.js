'use strict'

function init() {
    gBooks = loadFromStorage(STORAGE_KEY) || createBooks()
    _initByQueryStringParams()
    renderPagination()
    renderBooks()
}

function onAddBook() {

    setModalAdd()
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

function onRead(bookId) {
    if (!bookId) return

    elModal.show()
    readBook(bookId)
    doTranslate()
}

function onRate(bookId, change) {
    let book = getBookById(bookId)
    updateRate(book, change)
    document.querySelector('.input-group-text').innerHTML = book.rating
}

function onUpdate(bookId) {

    elModal.show()
    setModalUpdate(bookId)
    doTranslate()
}

function _onSubmitUpdate(event, bookId) {
    event.preventDefault()
    const title = document.querySelector('form input[name=title]').value
    const price = +document.querySelector('form input[name=price]').value
    updateBook(bookId, price, title)
    renderBooks()
}

function onRemoveBook(bookId) {
    elModal.show()
    setModalDelete(bookId)
    renderBooks()
}

function onFilterByPrice(maxPrice) {

    setPriceFilter(+maxPrice)
    renderBooks()
}

function onFilterByRating(minRating) {
    setRatingFilter(+minRating)
    renderBooks()
}

function onFilterByTxt(text) {
    setTextFilter(text)
    renderBooks()
}

function _initByQueryStringParams() {
    const queryStringParams = getQueryStringParams()
    setLayoutByQueryStringParams(queryStringParams)

    gFilterBy = getFilterByQueryStringParams(queryStringParams)
    renderFilters()

    onRead(queryStringParams.get('read'))

    let lang = queryStringParams.get('lang') || 'eng'
    onSetLang(lang)
}

function onSwitchDisplay(isCards) {
    setDisplay(isCards) // on services/views.js
    renderBooks()
}

function onSortBy(elTd) {
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
    setQueryStringParams()
    setDirection(lang)
    doTranslate()
}

