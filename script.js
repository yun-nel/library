// Modal logic
const newBookBtn = document.querySelector('.new-book');
const modal = document.querySelector('.modal');
const body = document.querySelector('body');
const darkBg = document.createElement('div');

// Open
newBookBtn.addEventListener('click', () => {
  modal.classList.add('show-modal');
  darkBg.classList.add('dark-bg');
  body.insertAdjacentElement('afterbegin', darkBg);
});

// Close
function clearForm() {
  const form = document.querySelector('form');
  const inputs = form.querySelectorAll('input');

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

// Returns a button element with class "remove-book"
function createRemoveBookBtn() {
  const removeBookBtn = document.createElement('button');
  removeBookBtn.classList.add('remove-book');
  removeBookBtn.textContent = 'Remove';
  return removeBookBtn;
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

    bookKeys.forEach((key) => {
      const p = document.createElement('p');
      p.textContent = book[key];
      card.insertAdjacentElement('beforeend', p);
    });
    const removeBookBtn = createRemoveBookBtn();
    card.insertAdjacentElement('beforeend', removeBookBtn);
    removeBookBtn.setAttribute('button-index', index);
    container.appendChild(card);
  });
}

// Appends createBook() to myLibrary, and calls displayBooks() to render new list
function addBookToLibrary() {
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    myLibrary.push(createBook(form));
    displayBooks();
    closeModal();
  });
}

// Removes book object from myLibrary via button click and calls displayBooks() to render new list
function removeBookFromLibrary() {
  const container = document.getElementById('book-container');

  container.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-book')) {
      const index = event.target.getAttribute('button-index');
      myLibrary.splice(index, 1);
      displayBooks();
    }
  });
}

addBookToLibrary();
removeBookFromLibrary();
