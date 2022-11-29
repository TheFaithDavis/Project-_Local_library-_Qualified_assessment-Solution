function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1 : -1));
}

function getTotalNumberOfBorrows(account, books) {
  let count = 0;
  books.forEach(book => {
    const borrowedById = borrowsById(book, account);
    count += borrowedById.length;
  });
  return count;}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = books.filter(book => book.borrows.some(borrow => (!borrow.returned && borrow.id === account.id)));
  const result = [];
  borrowedBooks.forEach(book => {
    const bookAuthor = findAuthorById(authors, book.authorId);
    result.push({
      id: book.id,
      title: book.title,
      genre: book.genre,
      authorId: book.authorId,
      author: bookAuthor,
      borrows: book.borrows,
    });
  });
  return result;
}

// HELPER FUNCTIONS

// a function to look up borrows of a given book by a particular account
// parameters:
  // a book object
  // an id, deconstructed from an account argument
// return:
  // a list of borrows by the provided account id
function borrowsById (book, {id}) {
  return book.borrows.filter(borrow => borrow.id === id);
}

function findAuthorById(authors, id) {
  return authors.find(author => id === author.id);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};