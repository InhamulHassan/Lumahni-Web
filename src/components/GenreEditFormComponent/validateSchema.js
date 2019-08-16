export default {
  genreName: {
    presence: {
      allowEmpty: false,
      message: "^Genre Name is required"
    }
  },
  description: {
    presence: {
      allowEmpty: false,
      message: "^Genre Description is required"
    },
    length: {
      maximum: 2000,
      tooLong: "^Genre Description should be less than 2000 characters"
    }
  },
  imgLink: {
    url: {
      message: "^Genre Image Link should be a valid URL"
    }
  },
  imgLargeLink: {
    url: {
      message: "^Genre Large Image Link should be a valid URL"
    }
  },
  imgThumbnailLink: {
    url: {
      message: "^Genre Thumbnail Image Link should be a valid URL"
    }
  }
};
