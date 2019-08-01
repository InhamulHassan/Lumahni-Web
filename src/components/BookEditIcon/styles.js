// Component styles

export default theme => ({
  root: {},
  editIconButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    cursor: "pointer",
    zIndex: "10",
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    boxShadow: "0px 0px 25px -5px rgba(0,0,0,0.25)",
    "&:hover": {
      backgroundColor: "rgba(255,255,255, 0.8)"
    }
  }
});
