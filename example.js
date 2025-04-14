const bookContainer = document.querySelector(".books-container");
const dialog = document.getElementById('myDialog');
const submitForm = document.querySelector("form");
const library = [];

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  library.push(newBook);
}

function displayBooks() {
  bookContainer.innerHTML = '';
  library.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.dataset.id = book.id;

    card.innerHTML = `
      <strong>${book.title}</strong><br>
      Author: ${book.author}<br>
      Pages: ${book.pages}<br>
      Read: ${book.isRead ? 'Yes' : 'No'}<br><br>
      <button class="remove-btn">Remove</button>
      <button class="toggle-read-btn">Toggle Read</button>
    `;

    card.querySelector('.remove-btn').addEventListener('click', () => {
      removeBook(card.dataset.id);
    });

    card.querySelector('.toggle-read-btn').addEventListener('click', () => {
      book.toggleRead();
      displayBooks();
    });

    bookContainer.appendChild(card);
  });
}

function removeBook(bookId) {
  const index = library.findIndex(book => book.id === card.dataset.id);
  if (index !== -1) {
    library.splice(index, 1);
    displayBooks();
  }
}

function openDialog() {
  dialog.showModal();
}

function closeDialog() {
  dialog.close();
}

submitForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const title = submitForm.elements["title"].value;
  const author = submitForm.elements["Author"].value;
  const pages = submitForm.elements["pages"].value;
  const isRead = submitForm.elements["IsRead"].checked;

  addBookToLibrary(title, author, pages, isRead);
  displayBooks();
  closeDialog();
  submitForm.reset(); 
});
