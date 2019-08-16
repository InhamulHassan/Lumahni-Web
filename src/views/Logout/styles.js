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
  gridItem: {
    position: "relative",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  errorWrapper: {
    paddingTop: "40vh",
    paddingBottom: "40vh",
    display: "flex",
    justifyContent: "center"
  },
  progressWrapper: {
    paddingTop: "48px",
    paddingBottom: "24px",
    display: "flex",
    justifyContent: "center"
  }
});
