import { IAuthors, ICatalogue, IGenres, IItemTypes } from "@/types";

const catalogsData: ICatalogue[] = [
  {
    id: "1",
    itemType: "Book",
    title: "The Great Gatsby",
    authors: "F. Scott Fitzgerald",
    genres: "Fiction",
    publisher: "Scribner",
    yearPublished: 1925,
    availableCopies: 5,
    status: true,
  },
  {
    id: "2",
    itemType: "Book",
    title: "To Kill a Mockingbird",
    authors: "Harper Lee",
    genres: "Fiction",
    publisher: "J. B. Lippincott & Co.",
    yearPublished: 1960,
    availableCopies: 7,
    status: true,
  },
  {
    id: "3",
    itemType: "Book",
    title: "1984",
    authors: "George Orwell",
    genres: "Science Fiction",
    publisher: "Secker & Warburg",
    yearPublished: 1949,
    availableCopies: 3,
    status: true,
  },
  {
    id: "4",
    itemType: "Book",
    title: "The Catcher in the Rye",
    authors: "J.D. Salinger",
    genres: "Fiction",
    publisher: "Little, Brown and Company",
    yearPublished: 1951,
    availableCopies: 4,
    status: true,
  },
  {
    id: "5",
    itemType: "Book",
    title: "Pride and Prejudice",
    authors: "Jane Austen",
    genres: "Fiction",
    publisher: "T. Egerton, Whitehall",
    yearPublished: 1813,
    availableCopies: 6,
    status: true,
  },
  {
    id: "6",
    itemType: "Book",
    title: "The Hobbit",
    authors: "J.R.R. Tolkien",
    genres: "Fantasy",
    publisher: "George Allen & Unwin",
    yearPublished: 1937,
    availableCopies: 2,
    status: true,
  },
  {
    id: "7",
    itemType: "Book",
    title: "The Da Vinci Code",
    authors: "Dan Brown",
    genres: "Mystery",
    publisher: "Doubleday",
    yearPublished: 2003,
    availableCopies: 8,
    status: true,
  },
  {
    id: "8",
    itemType: "Book",
    title: "The Hunger Games",
    authors: "Suzanne Collins",
    genres: "Science Fiction",
    publisher: "Scholastic",
    yearPublished: 2008,
    availableCopies: 10,
    status: true,
  },
  {
    id: "9",
    itemType: "Book",
    title: "Brave New World",
    authors: "Aldous Huxley",
    genres: "Science Fiction",
    publisher: "Chatto & Windus",
    yearPublished: 1932,
    availableCopies: 1,
    status: true,
  },
  {
    id: "10",
    itemType: "Book",
    title: "The Lord of the Rings",
    authors: "J.R.R. Tolkien",
    genres: "Fantasy",
    publisher: "George Allen & Unwin",
    yearPublished: 1954,
    availableCopies: 9,
    status: true,
  },
];

const authorsData: IAuthors[] = [
  {
    id: "1",
    author: "Jane Austen",
  },
  {
    id: "2",
    author: "William Shakespeare",
  },
  {
    id: "3",
    author: "George Orwell",
  },
  {
    id: "4",
    author: "F. Scott Fitzgerald",
  },
  {
    id: "5",
    author: "Harper Lee",
  },
  {
    id: "6",
    author: "J.K. Rowling",
  },
  {
    id: "7",
    author: "Charles Dickens",
  },
  {
    id: "8",
    author: "Mark Twain",
  },
  {
    id: "9",
    author: "Leo Tolstoy",
  },
  {
    id: "10",
    author: "Emily Brontë",
  },
];

const genresData: IGenres[] = [
  {
    id: "1",
    genre: "Science Fiction",
  },
  {
    id: "2",
    genre: "Fantasy",
  },
  {
    id: "3",
    genre: "Mystery",
  },
  {
    id: "4",
    genre: "Romance",
  },
  {
    id: "5",
    genre: "Historical Fiction",
  },
  {
    id: "6",
    genre: "Thriller",
  },
  {
    id: "7",
    genre: "Horror",
  },
  {
    id: "8",
    genre: "Dystopian",
  },
  {
    id: "9",
    genre: "Adventure",
  },
  {
    id: "10",
    genre: "Biography",
  },
];

const itemTypesData: IItemTypes[] = [
  {
    id: "1",
    itemType: "Book",
  },
  {
    id: "2",
    itemType: "DVD",
  },
  {
    id: "3",
    itemType: "Magazine",
  },
  {
    id: "4",
    itemType: "CD",
  },
  {
    id: "5",
    itemType: "Ebook",
  },
  {
    id: "6",
    itemType: "Audiobook",
  },
  {
    id: "7",
    itemType: "Video Game",
  },
  {
    id: "8",
    itemType: "Journal",
  },
  {
    id: "9",
    itemType: "Comic Book",
  },
  {
    id: "10",
    itemType: "Graphic Novel",
  },
];

export { catalogsData, authorsData, genresData, itemTypesData };
