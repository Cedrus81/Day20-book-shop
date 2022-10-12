'use strict'

const STORAGE_KEY = 'booksDB'
const LAYOUT_KEY = 'layoutDB'

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}