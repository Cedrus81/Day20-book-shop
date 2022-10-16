function renderBooksTable(books) {
    let strHTML = ''
    let page = _getPage(books)
    page.forEach(book => {
        strHTML +=
            `<tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${formatCurrency(book.price)}</td>
                <td colspan ="3"><div class="actions-tab">${_getReadBtn(book.id)}${_getUpdateBtn(book.id)}${_getDeleteBtn(book.id)}</div></td>
            </tr>`
    })
    document.querySelector('tbody').innerHTML = strHTML
}

function renderBooksCards(books) {
    let strHTML = ''
    let page = _getPage(books)
    page.forEach(book => {
        // <li class="list-group-item card-img" </li>
        strHTML +=
            `<div class="card" style="background-image: url(${book.image})">
        <ul class="list-group list-group-flush" >
          <li class="list-group-item"><h5>${book.title}</h5></li>
          <li class="list-group-item"><span><span data-trans="read-price"></span> ${formatCurrency(book.price)}</span></li>
        </ul>
        <div class="card-footer .actions-tab">
        ${_getReadBtn(book.id)}
        ${_getUpdateBtn(book.id)}
        ${_getDeleteBtn(book.id)}
        </div>
      </div>`
    })
    document.querySelector('.cards').innerHTML = strHTML
}

function _getReadBtn(bookId) {
    return `<button class="action read-button" data-trans="read" onclick="_onRead('${bookId}')"></button>`
}

function _getUpdateBtn(bookId) {
    return `<button class="action update-button" data-trans="update" onclick="_onUpdate('${bookId}')"></button>`
}

function _getDeleteBtn(bookId) {
    return `<button class="action delete-button" data-trans="delete" onclick="_onRemoveBook('${bookId}')"></button>`
}

function readBook(bookId, elModal) {
    let book = getBookById(bookId)
    setQueryStringParams(bookId)
    elModal.innerHTML = `<div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`
    fetch(book.image)
        .then(response => {
            _setModalRead(book, response.url, elModal)
            doTranslate()
        })
}

function renderFiltersByQueryStringParams(filterBy) {
    document.querySelector('.price-range').value = filterBy.maxPrice
    document.querySelector('.rating-range').value = filterBy.minRating
    document.querySelector('.text-filter').value = filterBy.text
}

function _setModalRead(book, image, elModal) {
    elModal.innerHTML = `
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
      <img class="img-fluid" src="${image}" alt="">
      </div>
      <div class="modal-body">
      <h3>${book.title}</h3>
        
      <h4 data-trans="read-description"></h4>
      <p data-trans="lorem">
      </p>
      <br>
      <span><span data-trans="read-price"></span> ${formatCurrency(book.price)}</span>
      </div>
        <div class="modal-footer">
            ${renderRating(book)}
            <button type="button" class="btn btn-secondary" data-trans="btn-close-modal" data-bs-dismiss="modal" onclick="onCloseModal()"></button>
        </div>
      </div>
    </div>`
}

function setModalAdd(elModal) {
    elModal.innerHTML = `elModal.innerHTML = 
    <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" data-trans="add-book-header"></h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" onclick="onCloseModal()" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <form onsubmit="_onSubmitBook(event);">
    <label> Book Title:
        <input type="text" class="form-control" name="title" placeholder="Book Name">
    </label><br>
    <label> Book Price (max. 100$):
        <input type="number" class="form-control" min="1" max="100" name="price">
    </label><br>
    <label> Book Rating (max. 10):
        <input type="number" class="form-control" min="0" max="10" name="rating">
    </label><br>
    <button class="btn btn-primary" data-trans="btn-add"></button>
    </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-trans="btn-close-modal" data-bs-dismiss="modal" onclick="onCloseModal()"></button>
    </div>
    </div>
    </div>`

}

function setModalUpdate(elModal, bookId) {
    let book = getBookById(bookId)
    elModal.innerHTML = `
    <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h1 data-trans="update"></h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                     <form onsubmit="_onSubmitUpdate(event, '${bookId}')" class="needs-validation" novalidate>
                        <label for="updateName" data-trans="th-title"></label>
                        <input id="updateName" class="form-control" type="text" name="title" value="${book.title}" required>
                        
                        <label for="updatePrice" data-trans="read-price"></label>
                        <input id="updatePrice" class="form-control" type="number" min="1" max="100" name="price" value="${book.price}" required>
                        
                        <button class="btn btn-warning" type="submit" data-bs-dismiss="modal">Submit</button>
                    </form>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-trans="btn-close-modal" data-bs-dismiss="modal"></button>
                </div>
            </div>
        </div>
`


}

function moveModal(elModal) {
    elModal.classList.add('open')
}

function renderRating(book) {
    return `
    <div class="rating"><span data-trans="rate-this-book"></span><div class="btn-group" role="group" aria-label="Basic radio toggle button group">
<input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" onclick="onRate('${book.id}', -1)">
<label class="btn btn-outline-primary" for="btnradio1">-</label>
<div class="input-group-text" id="btnGroupAddon">${book.rating}</div>
<input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" onclick="onRate('${book.id}', 1)">
<label class="btn btn-outline-primary" for="btnradio3">+</label>
</div></div>
`

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
    strHTML = `<a data-page="0" data-trans="pagination-first" onclick="onNavigate(this)">&laquo;</a>`
    for (let i = gPageIndex - 2; i <= gPageIndex + 2; i++) {
        if (i > lastPage) break
        if (i < 0) continue

        let isDisabled = _isDisabled(i, lastPage) ? 'disabled' : ''
        //  get value set page idx
        strHTML += `<span data-page="${i}" class="${isDisabled}" onclick="onNavigate(this)">${i + 1}</span>`
    }
    strHTML += `<a data-page="${lastPage}" data-trans="pagination-last" onclick="onNavigate(this)">&raquo;</a>`
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
