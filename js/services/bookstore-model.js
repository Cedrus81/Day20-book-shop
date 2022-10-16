const PAGE_SIZE = 5
var gLayout = 'table'
var gPageIndex = 0
var gBooks = []
var gFilterBy = {
    maxPrice: 100,
    minRating: 0,
    text: '',
}

function createBooks() {
    for (let i = 0; i < 18; i++) {
        addBook()
    }
    return gBooks
}

function getBooks() {
    return gBooks.filter(book => _useFilter(book))
}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    saveToStorage(STORAGE_KEY, gBooks)
    renderBooks()
}

function addBook(title, price, rating) {
    let imageNum = getRandomIntFrom1(115)  // size of the unsplash library
    let newBook = {
        id: makeId(),
        image: `https://source.unsplash.com/collection/1018825/?sig=${imageNum}`,
        price: price || getRandomIntFrom1(),
        rating: rating || 0,
        title: title || GetRandomBookTitle(),
    }
    gBooks.unshift(newBook)
    saveToStorage(STORAGE_KEY, gBooks)

}

function updateBook(bookId, price, title) {
    let book = getBookById(bookId)
    book.price = price
    book.title = title
    saveToStorage(STORAGE_KEY, gBooks)
}

function updateRate(book, change) {
    if (book.rating + change >= 0 && book.rating + change <= 10) book.rating += change
    saveToStorage(STORAGE_KEY, gBooks)
}

function setQueryStringParams(bookId) {
    const queryString = `?minRating=${gFilterBy.minRating}&maxPrice=${gFilterBy.maxPrice}${gFilterBy.text ? `&text=${gFilterBy.text}` : ''}${bookId ? `&read=${bookId}` : ''}&layout=${loadFromStorage(LAYOUT_KEY)}&lang=${gCurrLang}`

    const newUrl = location.protocol + '//' + location.host + location.pathname + queryString
    history.pushState({ path: newUrl }, '', newUrl)
}

function setPriceFilter(value) {
    gFilterBy.maxPrice = value
}

function setRatingFilter(value) {
    gFilterBy.minRating = value
}

function setTextFilter(text) {
    gFilterBy.text = text
}

function _useFilter(book) {
    return book.price <= +gFilterBy.maxPrice &&
        book.rating >= +gFilterBy.minRating &&
        book.title.toLowerCase().includes(gFilterBy.text)
}

function setPage(value) {
    value = +value
    let books = getBooks()
    let lastPage = Math.floor(books.length / PAGE_SIZE)
    if (value >= 0 && value <= lastPage) gPageIndex = value
}

function _getPage(books) {
    let startIdx = gPageIndex * PAGE_SIZE
    return books.slice(startIdx, startIdx + PAGE_SIZE)
}

function renderBooks() {
    // setQueryStringParams()
    let isCards = getQueryStringParams().get('layout') === 'cards' ? true : false
    let books = getBooks()
    if (!isCards) renderBooksTable(books)
    else renderBooksCards(books)
    doTranslate()
}

function setFilterByQueryStringParams(queryStringParams) {
    const filterBy = {
        maxPrice: queryStringParams.get('maxPrice') || 100,
        minRating: queryStringParams.get('minRating') || 0,
        text: queryStringParams.get('text') || ''
    }
    return filterBy
}

function setLayoutByQueryStringParams(queryStringParams) {
    let layout = queryStringParams.get('layout') || 'table'
    saveToStorage(LAYOUT_KEY, layout)
}

function sortBooks(method) {
    switch (method) {
        case 'title':
            gBooks.sort((a, b) => a.title.localeCompare(b.title))
            method = 'title-reverse'
            break;
        case 'title-reverse':
            gBooks.sort((a, b) => b.title.localeCompare(a.title))
            method = 'title'
            break;
        case 'price':
            gBooks.sort((a, b) => b.price - a.price)
            method = 'price-reverse'
            break;
        case 'price-reverse':
            gBooks.sort((a, b) => a.price - b.price)
            method = 'price'
            break;
    }
    saveToStorage(STORAGE_KEY, gBooks)
    return method
}

