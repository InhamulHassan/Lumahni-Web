// Component styles

export default theme => ({
  root: {},
  form: {},
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  errorIcon: {
    marginRight: theme.spacing(1)
  },
  fieldError: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    color: theme.palette.danger.main,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  successIcon: {
    marginRight: theme.spacing(1)
  },
  fieldSuccess: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    color: theme.palette.success.main,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  progressContainer: {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "15",
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center"
  },
  mainViewFooter: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
});
