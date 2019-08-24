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
    marginBottom: theme.spacing(2),
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start"
    }
  },
  imageWrapper: {
    height: "140px",
    width: "100px",
    minWidth: "100px",
    margin: theme.spacing(1),
    marginRight: theme.spacing(3),
    borderRadius: "15px",
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
  title: {
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
  authors: {
    marginTop: theme.spacing(1),
    display: "flex",
    fontSize: "12px",
    textAlign: "center",
    lineHeight: "22px",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  },
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    flexBasis: "100%",
    flexWrap: "wrap"
  },
  authorContainer: {
    width: "auto",
    maxWidth: "250px",
    minWidth: "30px",
    height: "25px",
    borderRadius: "30px",
    background: "linear-gradient(to right, #ff647c, #fdafbb)",
    marginBottom: theme.spacing(1.5),
    marginLeft: theme.spacing(1),
    whiteSpace: "nowrap",
    padding: "0 12px"
  },
  author: {
    display: "inline-block",
    fontSize: "10px",
    lineHeight: "25px",
    color: theme.palette.common.white
  }
});
