// Array chứa thông tin về các cuốn sách
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

// Function trả về toàn bộ danh sách sách
function getBooks() {
  return data;
}

// Function tìm và trả về một cuốn sách theo id
function getBook(id) {
  return data.find((d) => d.id === id);
}
/*
// Lấy cuốn sách có id = 2
const book = getBook(3);

// Sử dụng object destructuring để lấy các thuộc tính title, author và genres từ book
const { title, author, genres, publicationDate, pages } = book;
console.log(author, title, pages);

// Sử dụng array destructuring để tách các phần tử của mảng genres
// firstGenre: phần tử đầu tiên
// secondGenre: phần tử thứ hai
// orther: các phần tử còn lại (rest operator)
const [firstGenre, secondGenre, ...orther] = genres;
console.log(firstGenre, secondGenre, orther);

// Tạo một mảng mới bằng cách spread toàn bộ genres và thêm một phần tử mới
const newGenres = [...genres, "new genre"];
console.log(newGenres);

// Tạo một object mới từ book, đồng thời thêm/cập nhật các thuộc tính mới
// Sử dụng spread operator để copy toàn bộ thuộc tính của book
const updateBook = { ...book, moviePublicationDate: "2023-10-01", pages: 200 };
console.log(updateBook);

function getYear(str) {
  return str.split("-")[0];
}

const getYearArrow = (str) => str.split("-")[0];

console.log(getYearArrow(publicationDate));

const summary = `${title} là một cuốn sách của tác giả ${author}, xuất bản vào năm ${getYearArrow(
  publicationDate
)}`;
console.log(summary);

const pagesRange = pages > 1000 ? "over a thousand" : "less than 1000";
pagesRange;

console.log(`The book has ${pagesRange} pages.`);

const totalReviewCount = (str) =>
  str.reviews.librarything?.reviewsCount ??
  0 + str.reviews?.goodreads.reviewsCount;

console.log(totalReviewCount(book));
*/
const totalReviewCount = (str) =>
  str.reviews.librarything?.reviewsCount ??
  0 + str.reviews?.goodreads.reviewsCount ??
  0;

const books = getBooks();

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
