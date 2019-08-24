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
  authorAvatar: {
    position: "absolute",
    top: "-60px",
    left: "50px",
    height: "150px",
    width: "150px",
    boxShadow: "0px 0px 25px -5px rgba(0,0,0,0.25)"
  },
  bookAuthors: {
    width: "auto",
    minHeight: "30px"
  },
  authorNameContainer: {
    marginLeft: "200px"
  },
  authorName: {
    marginBottom: theme.spacing(1)
  },
  authorGenres: {
    width: "auto",
    minHeight: "30px"
  },
  genreContainer: {
    marginLeft: "20px",
    marginTop: "40px",
    marginBottom: "15px",
    "& .genreChipWrapper": {
      display: "inline-block"
    }
  },
  authorBiography: {
    margin: theme.spacing(3),
    textAlign: "justify",
    "& .read-more-button": {
      cursor: "pointer",
      display: "inline-block",
      marginLeft: theme.spacing(1),
      color: theme.palette.primary.main
    },
    "& .read-more-button:hover": {
      color: theme.palette.primary.dark,
      textDecoration: "underline"
    }
  },
  detailsContainer: {
    margin: theme.spacing(3)
  },
  detailsTitle: {
    marginBottom: theme.spacing(1.5)
  },
  authorDetailsContainer: {
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
  authorBooksContainer: {
    marginTop: theme.spacing(5),
    margin: theme.spacing(3)
  },
  authorBooksTitle: {
    marginBottom: theme.spacing(1.5)
  }
});
