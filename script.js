let myLibrary = [];
const bookshelf = document.querySelector("#bookshelf");

function Book(title, pages, read) {
    this.title = title;
    this.pages = pages;
    if (read == true) {
        this.read = "read";
    } else {
        this.read = "not read yet"
    }
}

Book.prototype.info = function () {
    return `${this.title}, ${this.pages} pages, ${this.read}`
}

const mobydick = new Book("Moby Dick", "400", false);
myLibrary.push(mobydick);

function addBookToLibrary () {

}

function displayBooks () {
    for (let book of myLibrary) {
        const mydiv = document.createElement("div");
        mydiv.textContent = book.info()
        bookshelf.appendChild(mydiv);
    }
}

displayBooks();