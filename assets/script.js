let myLibary = [];
const noBooks = document.querySelector(".no-books");

function Book(title, author, pages, isbn, read) {
    this.title = title;
    this.author = author; 
    this.pages = pages;
    this.isbn = isbn;
    this.read = read;
};

Book.prototype.showBookInfo = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
};

function addBooktoLibary(title, author, pages, isbn, read) {
    let newBook = new Book(title, author, pages, isbn, read);
    myLibary.push(newBook);
};

const bookContainer = document.querySelector('.book-container');
let newBookItem;

const form = document.querySelector("form");

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isbn = document.getElementById('isbn').value
    const read = document.getElementById('read').checked

    addBooktoLibary(title, author, pages, isbn, read);
    localStorage.setItem("myLibaryStorage", JSON.stringify(myLibary));
    createBook();
    if (noBooks != null) {
        noBooks.classList.add("removed");
    }
    closeModal();
    document.querySelector('form').reset();    
});

function createBook() {   
        let i = myLibary.length - 1;
        bookContainer.insertAdjacentHTML('afterbegin', `    
        <div class="book" id="book-${i}">
        <img src="https://covers.openlibrary.org/b/isbn/${myLibary[i].isbn}-L.jpg" alt="${myLibary[i].title}">
        <div class="details">
            <h2>${myLibary[i].title}</h2>
            <ul>
                <li>Author: ${myLibary[i].author}</li>
                <li>Pages: ${myLibary[i].pages}</li>
                <li>ISBN: ${myLibary[i].isbn}</li>
            </ul>
            <button class="status ${myLibary[i].read}" data-length="${myLibary.length - 1}">read</button>
            <button class="remove"  id="${myLibary.length - 1}">remove</button>
        </div>
        <span class="material-icons md-36">info</span>
        </div>`);
}

function initial() {   
    if (localStorage.myLibaryStorage !== undefined) {
        myLibary = JSON.parse(localStorage.getItem("myLibaryStorage"));
        let length = myLibary.length;
        for (let i = 0; i < length; i++) {
            bookContainer.insertAdjacentHTML('afterbegin', `    
            <div class="book" id="book-${i}">
            <img src="https://covers.openlibrary.org/b/isbn/${myLibary[i].isbn}-L.jpg" alt="${myLibary[i].title}">
            <div class="details">
                <h2>${myLibary[i].title}</h2>
                <ul>
                    <li>Author: ${myLibary[i].author}</li>
                    <li>Pages: ${myLibary[i].pages}</li>
                    <li>ISBN: ${myLibary[i].isbn}</li>
                </ul>
                <button class="status ${myLibary[i].read}" data-length="${i}">read</button>
                <button class="remove" class="book" id="${i}">remove</button>
            </div>
            <span class="material-icons md-36">info</span>
            </div>`);
            if (noBooks != null) {
                noBooks.classList.add("removed");
            }
        }    
    }
}

initial();

document.querySelectorAll('.book-container').forEach(item => {
    item.addEventListener('click', event => {
        if (event.target.classList.contains('remove')) {
            let bookToRemove = event.target.id;
            let containerToRemove = "book-" + bookToRemove;
            myLibary.splice(bookToRemove, 1);
            localStorage.clear();
            localStorage.setItem("myLibaryStorage", JSON.stringify(myLibary));
            document.querySelectorAll(".book").forEach(item  => {item.remove()});
            initial();
            if (myLibary.length === 0) {
                noBooks.classList.remove('removed')
            }           
          }
    }) 
  })


document.querySelectorAll(".book-container").forEach(item => {
    item.addEventListener("click", (event) => {
        if (event.target.classList.contains("true")) {
            let idBook = event.target.getAttribute("data-length"); 
            myLibary[idBook].read = false;
            let statusRead = document.querySelector(".true")
            statusRead.classList.remove("true")
            statusRead.classList.add("false")
            localStorage.setItem("myLibaryStorage", JSON.stringify(myLibary));
        } else if (event.target.classList.contains("false")) {
            let idBook = event.target.getAttribute("data-length"); 
            myLibary[idBook].read = true;
            let statusRead = document.querySelector(".false")
            statusRead.classList.remove("false")
            statusRead.classList.add("true")
            localStorage.setItem("myLibaryStorage", JSON.stringify(myLibary));
        }
    })
})

//overlay functions

const openModalButton = document.querySelectorAll('.add');
const closeModalButton = document.querySelectorAll('.close');
const modal = document.querySelector('.modal');
const overlay = document.getElementById('overlay');

openModalButton.forEach(button => {
    button.addEventListener('click', () => {
        modal.classList.add('active')
        overlay.classList.add('active')
    })
});

closeModalButton.forEach(button => {
    button.addEventListener('click', () => {
        closeModal();
    })
});

overlay.addEventListener('click', () => {
    closeModal();
})

function closeModal() {
    modal.classList.remove('active')
    overlay.classList.remove('active')
}