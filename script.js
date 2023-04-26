function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const myLibrary = [];

function addBookToLibrary() {
  const book = new Book('One Piece', 'Eiichiro Oda', '21,450', 'Completed');
  myLibrary.push(book);
}

function displayBook() {
  const container = document.getElementById('book-container');

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

addBookToLibrary();
addBookToLibrary();
addBookToLibrary();
console.log(myLibrary);
displayBook();

// Modal logic
const newBookBtn = document.querySelector('.new-book');
const submitBook = document.querySelector('.submit-book');
const modal = document.querySelector('.modal');
const body = document.querySelector('body');

// Open
const darkBg = document.createElement('div');

newBookBtn.addEventListener('click', () => {
  modal.classList.add('show-modal');
  darkBg.classList.add('dark-bg');
  body.insertAdjacentElement('afterbegin', darkBg);
});

// Close
function closeModal() {
  modal.classList.remove('show-modal');
  darkBg.remove();
}

submitBook.addEventListener('click', () => closeModal());
darkBg.addEventListener('click', () => closeModal());
