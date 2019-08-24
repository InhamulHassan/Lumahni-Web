// Component styles

export default theme => ({
  root: {},
  form: {
    display: "flex",
    flexWrap: "wrap"
  },
  group: {
    flexGrow: 1,
    padding: theme.spacing(2),
    flexBasis: "100%"
  },
  groupLabel: {
    color: theme.palette.text.secondary
  },
  groupField: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  field: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "flex-start"
  },
  textFieldFull: {
    marginRight: theme.spacing(3)
  },
  mainViewFooter: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
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
  submitError: {
    color: theme.palette.danger.main,
    alignText: "center",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2)
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
  }
});
