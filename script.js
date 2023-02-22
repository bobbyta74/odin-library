const bookshelf = document.querySelector("#bookshelf");
const addbook = document.querySelector("#addbook");
const myform = document.querySelector("form");
const submit = document.querySelector("#submit");
const body = document.querySelector("body");
const permanentelements = document.querySelector("#permanentelements");
const closeform = document.querySelector("#closeform")

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
    this.read = read;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages`
}

Book.prototype.toggleRead = function () {
    if (this.read) {
        this.read = false;
    } else {
        this.read = true;
    }
}

const mobydick = new Book("Moby Dick", "Herman Melville", 400, false);
myLibrary.push(mobydick);

//Change 'read' values of book object into colour-coded output
//element and book passed in as parameters because the actual 'toggle' and 'book' we manipulate vary for every book
function displayRead(element, book) {
    if (book.read) {
        element.textContent = "read";
        element.style.backgroundColor = "#00ca4e";
    } else {
        element.textContent = "not read";
        element.style.backgroundColor = "#ffbd44";
    }
}

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
        delbutton.setAttribute("class", "del");
        delbutton.addEventListener("click", function () {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            //RECURSION-JUTSU!!!
            //displayBooks() called to stop showing the deleted book
            displayBooks();
        });

        const toggle = document.createElement("button");
        displayRead(toggle, book);
        toggle.addEventListener("click", function () {
            book.toggleRead();
            displayRead(toggle, book);
        })

        let buttonsdiv = document.createElement("div");
        buttonsdiv.style.display = "flex";
        buttonsdiv.style.flexDirection = "column";
        buttonsdiv.style.gap = "2px";
        buttonsdiv.appendChild(toggle);
        buttonsdiv.appendChild(delbutton);
        mydiv.appendChild(buttonsdiv);
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

//Create book object, add to list, and update display
//This was originally an event listener on the submit button, but that didn't let the form get validated
myform.addEventListener("submit", function (e) {
    e.preventDefault();
    addBookToLibrary();
    displayBooks();
});

//Cancel adding new book
closeform.addEventListener("click", function () {
    closeForm();
});