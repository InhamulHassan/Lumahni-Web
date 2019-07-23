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
    alignItems: "flex-start",
    justifyContent: "space-around",
    marginBottom: theme.spacing(2)
  },
  imageWrapper: {
    height: "140px",
    width: "100px",
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
    lineHeight: "14px"
  },
  author: {
    display: "block",
    marginBottom: theme.spacing(0.25),
    marginLeft: theme.spacing(1),
    fontSize: "10px",
    lineHeight: "14px",
    color: theme.palette.text.secondary
  },
  description: {
    lineHeight: "16px",
    height: theme.spacing(4),
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: theme.palette.text.secondary,
    textAlign: "center",
    marginTop: theme.spacing(1)
  }
});
