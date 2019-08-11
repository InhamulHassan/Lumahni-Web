// View styles

export default theme => ({
  root: {
    position: "relative",
    padding: theme.spacing(3),
    margin: "24px 0px",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  },
  content: {
    marginTop: theme.spacing(2)
  },
  backIconButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    cursor: "pointer",
    zIndex: "10",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    boxShadow: "0px 0px 25px -5px rgba(0,0,0,0.25)",
    "&:hover": {
      backgroundColor: "rgba(255,255,255, 0.8)"
    }
  },
  editIconContainer: {
    position: "absolute",
    right: "50px"
  },
  imageWrapper: {
    position: "absolute",
    top: "-90px",
    left: "80px",
    height: "180px",
    width: "120px",
    borderRadius: "15px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 0px 25px -5px rgba(0,0,0,0.25)"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  bookAuthors: {
    width: "auto",
    minHeight: "30px"
  },
  bookTitleContainer: {
    marginLeft: "200px"
  },
  bookTitle: {
    marginBottom: theme.spacing(1)
  },
  authorContainer: {
    marginLeft: "200px",
    marginRight: "100px",
    "& div": {
      display: "inline-block"
    }
  },
  bookGenres: {
    width: "auto",
    minHeight: "30px"
  },
  genreContainer: {
    marginLeft: "20px",
    marginTop: "15px",
    marginBottom: "15px",
    "& .genreChipWrapper": {
      display: "inline-block"
    }
  },
  authorName: {
    marginBottom: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    color: theme.palette.text.secondary
  },
  bookDescription: {
    margin: theme.spacing(3),
    textAlign: "justify",
    "& .read-more-button": {
      cursor: "pointer",
      display: "inline-block",
      marginLeft: theme.spacing(1),
      color: theme.palette.primary.main
    }
  },
  detailsContainer: {
    margin: theme.spacing(3)
  },
  detailsTitle: {
    marginBottom: theme.spacing(1.5)
  },
  bookDetailsContainer: {
    "& .bookDetail": {
      marginBottom: theme.spacing(0.5),
      "& span": {
        color: theme.palette.text.secondary
      }
    }
  },
  progressWrapper: {
    paddingTop: "48px",
    paddingBottom: "24px",
    display: "flex",
    justifyContent: "center"
  },
  errorWrapper: {
    paddingTop: "40vh",
    paddingBottom: "40vh",
    display: "flex",
    justifyContent: "center"
  },
  link: {
    textDecoration: "none"
  },
  similarBooksContainer: {
    marginTop: theme.spacing(5),
    margin: theme.spacing(3)
  },
  similarBooksTitle: {
    marginBottom: theme.spacing(1.5)
  }
});
