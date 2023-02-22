const bookshelf = document.querySelector("#bookshelf");
const addbook = document.querySelector("#addbook");
const myform = document.querySelector("form");
const submit = document.querySelector("#submit");
const body = document.querySelector("body");
const permanentelements = document.querySelector("#permanentelements");

const inp_title = document.querySelector("#title");
const inp_author = document.querySelector("#author");
const inp_pages = document.querySelector("#pages");
const inp_read = document.querySelector("#read");

let myLibrary = [];
//Constructor function for book objects
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

//Actually put the books on the website
//Iterate through myLibrary and make a div with description and buttons for every object
function displayBooks () {
    bookshelf.textContent = "";
    if (myLibrary.length == 0) {
        bookshelf.textContent = "empty here innit";
    }
    for (let book of myLibrary) {
        const mydiv = document.createElement("div");
        mydiv.textContent = book.info()
        const delbutton = document.createElement("button");
        delbutton.textContent = "x";
        delbutton.addEventListener("click", function () {
            console.log("bruh")
            myLibrary.splice(myLibrary.indexOf(book), 1);
            //RECURSION-JUTSU!!!
            //displayBooks() called to stop showing the deleted book
            displayBooks();
        });
        mydiv.appendChild(delbutton);
        bookshelf.appendChild(mydiv);
    }
}
displayBooks();

//Restore form to defaults and hide
function closeForm() {
    inp_title.value = "";
    inp_author.value = "";
    inp_pages.value = 0;
    read.checked = false;
    myform.style.display = "none";
    permanentelements.style.filter = "none";
}

//Make new book object and add it to the array
function addBookToLibrary () {
    let newbook = new Book(inp_title.value, inp_author.value, inp_pages.value, inp_read.checked);
    myLibrary.push(newbook);
    closeForm();
}

//Show form
addbook.addEventListener("click", function () {
    permanentelements.style.filter = "blur(3px)";
    myform.style.display = "flex";
})

submit.addEventListener("click", function () {
    addBookToLibrary();
    displayBooks();
});