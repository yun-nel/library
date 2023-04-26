function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const myLibrary = [];

function addBookToLibrary() {
  const book = new Book('One Piece', 'Eiichiro Oda', '21,450', 'Read');
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
