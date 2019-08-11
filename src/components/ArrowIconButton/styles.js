// Component styles

export default theme => ({
  iconButton: {
    height: 50,
    width: 50,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    zIndex: "10",
    color: theme.palette.text.secondary,
    backgroundColor: "rgba(255,255,255, 0.5)",
    marginRight: theme.spacing(1),
    boxShadow: "0px 0px 25px -5px rgba(0,0,0,0.25)",
    transition: "all 200ms",
    "&:hover": {
      backgroundColor: theme.palette.background.default,
    }
  }
});
