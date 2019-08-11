export default {
  authorName: {
    presence: {
      allowEmpty: false,
      message: "^Author Name is required"
    }
  },
  biography: {
    presence: {
      allowEmpty: false,
      message: "^Author Description is required"
    },
    length: {
      maximum: 5000,
      tooLong: "^Author Description should be less than 5000 characters"
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
      message: "^Author Image Link should be a valid URL"
    }
  },
  imgLargeLink: {
    url: {
      message: "^Author Large Image Link should be a valid URL"
    }
  },
  imgThumbnailLink: {
    url: {
      message: "^Author Thumbnail Image Link should be a valid URL"
    }
  }
};
