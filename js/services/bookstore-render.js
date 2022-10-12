function renderBooksTable(books) {
    let strHTML = ''
    let page = _getPage(books)
    page.forEach(book => {
        strHTML +=
            `<tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.price}</td>
                <td><button class="action read-button" onclick="_onRead('${book.id}')">Read</button></td>
                <td><button class="action update-button" onclick="_onUpdate('${book.id}')">Update</button></td>
                <td><button class="action delete-button" onclick="_onRemoveBook('${book.id}')">Delete</button></td>
            </tr>`
    })
    document.querySelector('tbody').innerHTML = strHTML
}

function renderBooksCards(books) {
    let strHTML = ''
    let page = _getPage(books)
    page.forEach(book => {
        strHTML += `
        <div class="card">
            <img src="${book.image}" alt="https://source.unsplash.com/collection/1018825/125x125/?sig=1" crossorigin>
            <h3>${book.title}</h3>
            <h4>Price in store: ${book.price}$</h4>
            <button class="action read-button" onclick="_onRead('${book.id}')">Read</button>
            <button class="action update-button" onclick="_onUpdate('${book.id}')">Update</button>
            <button class="action delete-button" onclick="_onRemoveBook('${book.id}')">Delete</button>
        </div>`
    })
    document.querySelector('.cards').innerHTML = strHTML
}

function readBook(bookId) {
    let book = getBookById(bookId)
    let elModal = document.querySelector('.modal')
    moveModal(elModal)
    fetch(book.image)
        .then(response => {
            _setModalRead(book, response.url, elModal)
            setQueryStringParams(bookId)
        })
}

function renderFiltersByQueryStringParams(filterBy) {
    document.querySelector('.price-range').value = filterBy.maxPrice
    document.querySelector('.rating-range').value = filterBy.minRating
    document.querySelector('.text-filter').value = filterBy.text
}

function renderLayoutSwitchByQueryStringParams(queryStringParams) {
    let displaySwitch = document.querySelector('.switch input')
    if (queryStringParams.get('layout') === 'table') displaySwitch.checked = false
    else displaySwitch.checked = true
    setDisplay(displaySwitch.checked)
}

function _setModalRead(book, image, elModal) {

    elModal.innerHTML = `
    <div class="modal-header">
    <img onerror="" src="${image}" alt="">
    <h3>${book.title}</h3>
    <div class="modal-header-buttons">
    <button class="close-modal" onclick="_onCloseModal()">Close</button>
    ${renderRating(book)}
    </div>
    </div>
    <h4>Description:</h4>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Quisquam illo ea quaerat maxime molestiae numquam impedit delectus
    doloribus aliquid dolorum aut blanditiis, iste hic architecto, libero incidunt.
    Laborum, quod natus.
    <br><br>
    Price in store: ${book.price}$ (Special offer discount).
    </p>
    `
}

function setModalAdd(elModal) {
    elModal.innerHTML = ` <form onsubmit="_onSubmitBook(event)">
    <label> Book Title:
        <input type="text" name="title" placeholder="Book Name">
    </label><br>
    <label> Book Price (max. 100$):
        <input type="number" min="1" max="100" name="price">
    </label><br>
    <label> Book Rating (max. 10):
        <input type="number" min="0" max="10" name="rating">
    </label><br>
    <button>Submit</button>
</form>`
}

function setModalUpdate(elModal, bookId) {
    elModal.innerHTML = `
    <form onsubmit="_onSubmitUpdate(event, '${bookId}')">
    <label> Book Title:
    <input type="text" name="title" placeholder="Book Name">
        </label><br>
    <label> Book Price (max. 100$):
        <input type="number" min="1" max="100" name="price">
    </label><br>
    <button>Submit</button>
</form>`
}

function moveModal(elModal) {
    elModal.classList.add('open')
}

function closeModal() {
    let elModal = document.querySelector('.modal')
    elModal.classList.remove('open')
}

function renderRating(book) {
    return `<div class="rating">
    <button class="minus" onclick="onRate('${book.id}', -1)">-</button>
    <span class="rate">${book.rating}</span>
    <button class="plus" onclick="onRate('${book.id}', 1)">+</button>
</div>`
}

function setDisplay(isCards) {
    if (isCards) {
        document.querySelector('table').classList.add('hidden')
        document.querySelector('.cards').classList.remove('hidden')
        saveToStorage(LAYOUT_KEY, 'cards')
    }
    else {
        document.querySelector('table').classList.remove('hidden')
        document.querySelector('.cards').classList.add('hidden')
        saveToStorage(LAYOUT_KEY, 'table')
    }
}

function renderSortTitle(elTd) {
    const elSorters = document.querySelectorAll('.sorter')
    for (const sorter of elSorters) {
        sorter.classList.remove('sorting')
    }
    elTd.classList.add('sorting')
}

function renderPagination() {
    // get length of btns
    let books = getBooks()
    let lastPage = Math.floor(books.length / PAGE_SIZE)

    // render btns
    strHTML = `<a data-page="0" onclick="onNavigate(this)">&laquo;</a>`
    for (let i = gPageIndex - 2; i <= gPageIndex + 2; i++) {
        if (i > lastPage) break
        if (i < 0) continue

        let isDisabled = _isDisabled(i, lastPage) ? 'disabled' : ''
        // todo get value set page idx
        strHTML += `<span data-page="${i}" class="${isDisabled}" onclick="onNavigate(this)">${i + 1}</span>`
    }
    strHTML += `<a data-page="${lastPage}" onclick="onNavigate(this)">&raquo;</a>`
    let elNav = document.querySelector('.pagination')
    elNav.innerHTML = strHTML
}

function _isDisabled(page, lastPage) {
    return (page < 0 || page > lastPage)

}

function activateButton(newValue) {
    let elSpan = document.querySelector(`span[data-page="${newValue}"]`)
    elSpan.classList.add('active')
}