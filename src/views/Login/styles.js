// View styles

export default theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100vh",
    minHeight: "300px"
  },
  grid: {
    height: "100%",
    minHeight: "100vh"
  },
  quoteRootContainer: {
    position: "relative",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  quoteImageContainer: {
    position: "relative",
    backgroundColor: theme.palette.common.neutral,
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  quoteImageWrapper: {
    width: "100%",
    height: "100%"
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover"
  },
  gradientOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: "0.3",
    backgroundColor: "#3d3d3d"
  },
  quoteWrapper: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexBasis: "600px",
    padding: "0 25px",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  quoteText: {
    color: theme.palette.common.white,
    fontSize: "1.5vmax",
    fontWeight: 300
  },
  quoteAuthor: {
    marginTop: theme.spacing(3),
    fontSize: "0.8rem",
    color: theme.palette.common.white
  },
  quotePublication: {
    marginTop: theme.spacing(1),
    fontSize: "0.7rem",
    fontStyle: "italic",
    color: theme.palette.common.neutral
  },
  contentContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      width: "100%",
      backgroundColor: "transparent"
    }
  },
  progressWrapper: {
    paddingTop: "48px",
    paddingBottom: "24px",
    display: "flex",
    justifyContent: "center"
  },
  circularProgress: {
    color: "#ffffff"
  }
});
