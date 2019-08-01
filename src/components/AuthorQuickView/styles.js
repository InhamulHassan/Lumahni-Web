// Component styles

export default theme => ({
  root: {
    maxWidth: "100%",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  details: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: theme.spacing(2)
  },
  imageWrapper: {
    height: "100px",
    width: "100px",
    margin: theme.spacing(1),
    marginRight: theme.spacing(3),
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 0px 15px -15px rgba(0,0,0,0.2)"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  name: {
    fontSize: "14px",
    lineHeight: "18px",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  generalText: {
    marginTop: theme.spacing(0.5),
    fontSize: "12px",
    color: theme.palette.text.secondary
  },
  info: {
    marginBottom: theme.spacing(3)
  },
  books: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "flex",
    fontSize: "12px",
    textAlign: "center",
    lineHeight: "22px",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  },
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    flexBasis: "max-content",
    flexWrap: "wrap"
  },
  bookContainer: {
    display: "flex",
    justifyContent: "center",
    width: "auto",
    maxWidth: "125px",
    minWidth: "50px",
    height: "25px",
    borderRadius: "30px",
    background: "linear-gradient(to right, #00c48c, #7ddfc3)",
    marginBottom: theme.spacing(2.5),
    marginLeft: theme.spacing(1)
  },
  book: {
    display: "inline-block",
    width: "100%",
    minWidth: "40px",
    margin: "0 10px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: "10px",
    lineHeight: "25px",
    color: theme.palette.common.white
  }
});
