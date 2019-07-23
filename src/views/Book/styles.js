// View styles

export default theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  iconButton: {
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
      backgroundColor: "rgba(255,255,255, 0.8)",
    }
  },
  imageWrapper: {
    height: "180px",
    width: "120px",
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
  progressWrapper: {
    paddingTop: '48px',
    paddingBottom: '24px',
    display: 'flex',
    justifyContent: 'center'
  },
  pagination: {
    marginTop: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});
