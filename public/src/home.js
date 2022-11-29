const { sortAccountsByLastName } = require("./accounts");
const { partitionBooksByBorrowedStatus } = require("./books");

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const partitioned = partitionBooksByBorrowedStatus(books);
  return partitioned[0].length;
}

function getMostCommonGenres(books) {
  const genres = getAllGenres(books);
  const countList = [];
  
  genres.forEach(genre => {
    const genreBooks = books.filter(book => book.genre === genre);
    countList.push(genreBooks.length);
  });

  return makeSortedTopFiveNameCountArray(genres, countList);
}

function getMostPopularBooks(books) {
  const bookList = [];
  const countList = [];
  const bookIdList = [];

  books.forEach(book => {
    if(!bookIdList.includes(book.id)){
      bookIdList.push(book.id);
      bookList.push(book.title);
      countList.push(book.borrows.length);
    };
  });
  
  return makeSortedTopFiveNameCountArray(bookList, countList);
}

function getMostPopularAuthors(books, authors) {
  const authorList = [];
  const countList = [];
  const authorIdList = [];

  authors.forEach(author => {
    if (!authorIdList.includes(author.id)) {
    authorIdList.push(author.id);
    authorList.push(`${author.name.first} ${author.name.last}`);
    const authorBooks = books.filter(book => book.authorId === author.id);
    const authorBooksBorrows = authorBooks.map(book => book.borrows.length);
    countList.push(authorBooksBorrows.reduce((acc, count) => acc + count));
    }
  });
  
  return makeSortedTopFiveNameCountArray(authorList, countList);
}


// HELPER FUNCTIONS

// a function to list all genres in a given array of books
// parameters:
  // an array of book objects
// return:
  // a list of all the genres included in the parameter array
function getAllGenres (books) {
  const genres = [];
  books.forEach(book => {
    // test for a genre being listed multiple times
    if (!genres.includes(book.genre)) genres.push(book.genre);
  });
  return genres;
}

// takes an array of descriptors and makes an array of objects in this format
// [{name: descriptop, count: 0}]
// parameters:
  // an array of names, and an array of counts (these should correspond by index)
// returns:
  // an array of objects
function makeNameAndCountArray (nameList, countList) {
  const result = nameList.reduce((acc, desc, index) => {
    acc.push({name: desc, count: countList[index]});
    return acc;
  }, []);
  return result;
}

// puts an array of name / count objects into order from highest to lowest count
// parameters:
  // an array of name / count objects
// returns:
  // the sorted parameter array
function orderByCount (nameCount) {
  return nameCount.sort((placeA, placeB) => (placeB.count - placeA.count));
}

// a function to shorten a list to 5 or less items
// parameters:
  // an array
// return:
  // an array that is 5 or less items long
function topFive (list) {
  while (list.length > 5) {
    list.pop();
  }
  return list;
}

// a function to create the formatted return for all the top 5 lists here
// parameters:
  //  an array of names, and an array of counts (these should correspond by index)
// return:
  // an array of objects similar to {name: foo, count: number}, sorted largest to smallest, at most 5 objects long
function makeSortedTopFiveNameCountArray (nameList, countList)
{
  const result = makeNameAndCountArray(nameList, countList);
  orderByCount(result);
  return topFive(result);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
