// Dữ liệu sách
const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

// Lấy tất cả sách
function getBooks() {
  return data;
}

// Tìm sách theo id
function getBook(id) {
  return data.find((d) => d.id === id);
}

// Lấy sách có id = 3
const book = getBook(3);

// Destructuring object
const { title, author, genres, publicationDate, pages } = book;
console.log(author, title, pages);

// Destructuring array
const [firstGenre, secondGenre, ...orther] = genres;
console.log(firstGenre, secondGenre, orther);

// Spread operator với array
const newGenres = [...genres, "new genre"];
console.log(newGenres);

// Spread operator với object
const updateBook = { ...book, moviePublicationDate: "2023-10-01", pages: 200 };
console.log(updateBook);

// Hàm lấy năm từ chuỗi ngày
function getYear(str) {
  return str.split("-")[0];
}

// Arrow function lấy năm
const getYearArrow = (str) => str.split("-")[0];

console.log(getYearArrow(publicationDate));

// Template literal
const summary = `${title} là một cuốn sách của tác giả ${author}, xuất bản vào năm ${getYearArrow(
  publicationDate
)}`;
console.log(summary);

// Toán tử điều kiện
const pagesRange = pages > 1000 ? "over a thousand" : "less than 1000";
pagesRange;

console.log(`The book has ${pagesRange} pages.`);

// Optional chaining và nullish coalescing
const totalReviewCount1 = (str) =>
  str.reviews.librarything?.reviewsCount ??
  0 + str.reviews?.goodreads.reviewsCount;

console.log(totalReviewCount1(book));

const totalReviewCount = (str) =>
  str.reviews.librarything?.reviewsCount ??
  0 + str.reviews?.goodreads.reviewsCount ??
  0;

const books = getBooks();

// Array methods
const titles = books.map((books) => books.title);
titles;

const essentialData = books.map((book) => ({
  title: book.title,
  author: book.author,
  reviewsCount: totalReviewCount(book),
}));
essentialData;

const longBooks = books
  .filter((bools) => bools.pages > 500)
  .filter((books) => books.hasMovieAdaptation);
longBooks;

const adventureBooks = books
  .filter((book) => book.genres.includes("adventure"))
  .map((book) => book.title);
adventureBooks;

const pagesAllBooks = books.reduce((x, book) => x + book.pages, 0);
pagesAllBooks;

// Sort array
const arr = [3, 7, 1, 9, 6];
const sorted = arr.slice().sort((a, b) => a - b);

sorted;
arr;

const sortByPages = books
  .slice()
  .sort((a, b) => a.pages - b.pages)
  .map((book) => ({ titles: book.title, pages: book.pages }));
sortByPages;

// CRUD operations
const newBooks = { id: 6, title: "New Book", author: "New Author", pages: 300 };

const booksAfterAdd = [...books, newBooks].map((books) => ({
  id: books.id,
  titles: books.title,
}));
booksAfterAdd;

const booksAfterDelete = booksAfterAdd.filter((book) => book.id !== 3);
booksAfterDelete;

const booksAfterUpdate = booksAfterDelete.map((book) =>
  book.id === 6 ? { ...book, title: "Updated Book" } : book
);
booksAfterUpdate;

// Fetch API với Promise
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((res) => res.json())
  .then((data) => console.log(data));

// Fetch API với async/await
async function getTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  console.log(data);
}
