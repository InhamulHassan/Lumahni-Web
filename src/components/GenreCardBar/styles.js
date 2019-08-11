// Component styles

export default theme => ({
  imageWrapper: {
    position: "relative",
    height: "80px",
    width: "80px",
    margin: "20px auto",
    border: "1px solid #EDF0F2",
    borderRadius: "15px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  },
  gradientOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: "0.75",
    background: "linear-gradient(to right bottom, #be52f2, #eedff2)"
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    opacity: "0.5"
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    fontSize: "14px",
    lineHeight: "16px",
    textAlign: "center",
    color: theme.palette.primary.light
  }
});
