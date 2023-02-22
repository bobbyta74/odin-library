let myLibrary = [];
const bookshelf = document.querySelector("#bookshelf");
const addbook = document.querySelector("#addbook");
const myform = document.querySelector("form");
const submit = document.querySelector("#submit");
const body = document.querySelector("body");

const inp_title = document.querySelector("#title");
const inp_author = document.querySelector("#author");
const inp_pages = document.querySelector("#pages");
const inp_read = document.querySelector("#read");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    if (read == true) {
        this.read = "read";
    } else {
        this.read = "not read yet"
    }
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}

const mobydick = new Book("Moby Dick", "Herman Melville", 400, false);
myLibrary.push(mobydick);

function displayBooks () {
    bookshelf.textContent = "";
    for (let book of myLibrary) {
        const mydiv = document.createElement("div");
        mydiv.textContent = book.info()
        bookshelf.appendChild(mydiv);
    }
}

displayBooks();

addbook.addEventListener("click", function () {
    myform.style.filter = "none";
    myform.style.display = "flex";
})

function addBookToLibrary () {
    let newbook = new Book(inp_title.value, inp_author.value, inp_pages.value, inp_read.checked);
    myLibrary.push(newbook);
    inp_title.value = "";
    inp_author.value = "";
    inp_pages.value = 0;
    read.checked = false;
    myform.style.display = "none";
}

submit.addEventListener("click", function () {
    addBookToLibrary();
    displayBooks();
});