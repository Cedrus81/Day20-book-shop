'use strict'


function init() {
    gBooks = loadFromStorage(STORAGE_KEY) || createBooks()
    _initByQueryStringParams()
    renderPagination()
    doTranslate()
    renderBooks()
}

function _onAddBook() {
    let elModal = document.querySelector('.modal')
    moveModal(elModal)
    setModalAdd(elModal)
}

function _onSubmitBook(event) {
    event.preventDefault()
    const title = document.querySelector('form input[name=title]').value
    const price = document.querySelector('form input[name=price]').value
    const rating = document.querySelector('form input[name=rating]').value
    addBook(title, +price, +rating)
    renderBooks()
    closeModal()
}

function _onRead(bookId) {
    if (!bookId) return
    readBook(bookId)   // on services/views.js
}

function _onCloseModal() {
    closeModal()  // on services/views.js
    setQueryStringParams()
}

function onRate(bookId, change) {
    let book = getBookById(bookId)
    updateRate(book, change)
    document.querySelector('.rating').innerHTML = renderRating(book)
}

function _onUpdate(bookId) {
    let elModal = document.querySelector('.modal')
    moveModal(elModal)
    setModalUpdate(elModal, bookId)
}

function _onSubmitUpdate(event, bookId) {
    event.preventDefault()
    const title = document.querySelector('form input[name=title]').value
    const price = +document.querySelector('form input[name=price]').value
    updateBook(bookId, price, title)
    closeModal()
    renderBooks()
}

function _onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function _onFilterByPrice(maxPrice) {
    setPriceFilter(+maxPrice)
    getBooks()
    renderBooks()
}

function _onFilterByRating(minRating) {
    setRatingFilter(+minRating)
    getBooks()
    renderBooks()
}

function _onSetFilterByTxt(text) {
    setTextFilter(text)
    getBooks()
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
    doTranslate()
    renderBooks()
    setQueryStringParams()
}