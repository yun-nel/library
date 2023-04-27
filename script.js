// Modal logic
const newBookBtn = document.querySelector('.new-book');
const modal = document.querySelector('.modal');
const body = document.querySelector('body');
const darkBg = document.createElement('div');

// Open modal
newBookBtn.addEventListener('click', () => {
  modal.classList.add('show-modal');
  darkBg.classList.add('dark-bg');
  body.insertAdjacentElement('afterbegin', darkBg);
});

// Close modal
const checkbox = document.getElementById('read-check'); // Get checkbox to be used in multiple functions

function clearForm() {
  const form = document.querySelector('form');
  const inputs = form.querySelectorAll('input');
  checkbox.checked = false;

  inputs.forEach((input) => {
    input.value = '';
  });
}

function closeModal() {
  modal.classList.remove('show-modal');
  darkBg.remove();
  clearForm();
}

darkBg.addEventListener('click', () => closeModal());

// Array to store book objects
const myLibrary = [];

// Book object constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Returns a book object via user form input
function createBook(form) {
  const formData = new FormData(form);
  const [title, author, pages, read] = [...formData.values()];
  return new Book(title, author, pages, read);
}

Book.prototype.checkRead = function () {
  if (this.read === 'Read') return;
  this.read = 'Not read';
};

Book.prototype.toggleRead = function () {
  if (this.read === 'Read') this.read = 'Not read';
  else this.read = 'Read';
};

function createButton(className, textContent, index) {
  const button = document.createElement('button');
  button.classList.add(className);
  button.textContent = textContent;
  button.setAttribute('button-index', index);
  return button;
}

// Renders the book objects stored in myLibrary
function displayBooks() {
  const container = document.getElementById('book-container');
  container.innerHTML = '';

  myLibrary.forEach((book) => {
    const index = myLibrary.indexOf(book);
    const card = document.createElement('div');
    card.classList.add('book');
    card.dataset.index = index;
    const bookKeys = Object.keys(book);

    bookKeys.forEach((value) => {
      if (book[value] === 'Read' || book[value] === 'Not read') return;
      const p = document.createElement('p');
      p.textContent = book[value];
      card.insertAdjacentElement('beforeend', p);
    });
    card.insertAdjacentElement(
      'beforeend',
      createButton('toggle-read', book.read, index)
    );
    card.insertAdjacentElement(
      'beforeend',
      createButton('remove-book', 'Remove', index)
    );
    container.appendChild(card);
  });
}

// Appends createBook() to myLibrary, and calls displayBooks() to render new list
function addBookToLibrary() {
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkbox.value = checkbox.checked ? 'Read' : '';
    const book = createBook(form);
    book.checkRead();
    myLibrary.push(book);
    displayBooks();
    closeModal();
    console.log(myLibrary);
  });
}

const container = document.getElementById('book-container');

// Removes book object from myLibrary via button click and calls displayBooks() to render new list
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-book')) {
    const index = event.target.getAttribute('button-index');
    myLibrary.splice(index, 1);
    displayBooks();
  }
});

// Toggles read property of specific book object via button click and calls displayBooks() to render new list
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('toggle-read')) {
    const index = event.target.getAttribute('button-index');
    myLibrary[index].toggleRead();
    displayBooks();
  }
});

addBookToLibrary();
