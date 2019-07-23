export default {
  bookTitle: {
    presence: {
      allowEmpty: false,
      message: "^Book Title is required"
    }
  },
  description: {
    presence: {
      allowEmpty: false,
      message: "^Book Description is required"
    }
  },
  isbn: {
    presence: {
      allowEmpty: false,
      message: "^Book ISBN number is required"
    },
    length: {
      is: 10,
      notValid: "^Book ISBN number should have 10 digits"
    },
    numericality: {
      onlyInteger: true,
      notValid: "^ISBN should only contain numbers"
    }
  },
  isbn13: {
    presence: {
      allowEmpty: false,
      message: "^Book ISBN13 number is required"
    },
    length: {
      is: 13,
      notValid: "^Book ISBN number should have 13 digits"
    },
    numericality: {
      onlyInteger: true,
      notValid: "^ISBN13 should only contain numbers"
    }
  },
  grid: {
    presence: {
      allowEmpty: false,
      message: "^Goodreads ID is required"
    },
    numericality: {
      strict: true,
      onlyInteger: true,
      notValid: "^Goodreads ID should only contain numbers"
    }
  },
  imgLink: {
    url: {
      message: "^Book Cover Image Link should be a valid URL"
    }
  },
  imgThumbnailLink: {
    url: {
      message: "^Book Cover Thumbnail Image Link should be a valid URL"
    }
  }
};
