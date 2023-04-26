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

function displayBook() {
  const container = document.getElementById('book-container');
  container.innerHTML = '';

  myLibrary.forEach((book) => {
    const card = document.createElement('div');
    card.classList.add('book');
    const bookKeys = Object.keys(book);

    bookKeys.forEach((key) => {
      const p = document.createElement('p');
      p.textContent = book[key];
      card.insertAdjacentElement('beforeend', p);
    });
    container.appendChild(card);
  });
}

function addBookToLibrary() {
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const book = Object.fromEntries(formData);
    myLibrary.push(book);
    displayBook();
    closeModal();
  });
}

addBookToLibrary();
