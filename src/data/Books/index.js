// Mock data
import books from "./data";

export const getAllBooks = (limit = 6) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        books: products.slice(0, limit),
        booksTotal: products.length
      });
    }, 700);
  });
};
