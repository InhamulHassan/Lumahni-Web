// Component styles

export default theme => ({
  root: {
    maxWidth: "100%",
    cursor: "pointer",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    "&:hover $imageWrapper": {
      boxShadow: "0px 0px 15px 5px rgba(0,0,0,0.25)"
    }
  },
  imageWrapper: {
    height: "140px",
    width: "100px",
    margin: "0 auto",
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
  title: {
    fontSize: "13px",
    lineHeight: "15px",
    textAlign: "center",
    marginTop: theme.spacing(1)
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
