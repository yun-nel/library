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
