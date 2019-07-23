// Validation Helper
import isbnjs from "isbnjs";

export default function validateISBN(data) {
  const isbn = isbnjs.parse(data.isbn);
  const isbn13 = isbnjs.parse(data.isbn13);
  if (isbn && isbn13) {
    return isbn.isIsbn10() && isbn13.isIsbn13();
  } else {
    return false;
  }
}
