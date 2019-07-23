// Component styles

export default theme => ({
  root: {},
  form: {
    display: "flex",
    flexWrap: "wrap"
  },
  group: {
    flexGrow: 1,
    padding: theme.spacing(2)
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
  textField: {
    width: "320px",
    maxWidth: "100%",
    marginRight: theme.spacing(3)
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
  errorFieldContainer: {
    width: "320px",
    maxWidth: "100%",
    marginRight: theme.spacing(3)
  },
  submitError: {
    color: theme.palette.danger.main,
    alignText: "center",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  progressWrapper: {
    paddingTop: "48px",
    paddingBottom: "24px",
    display: "flex",
    justifyContent: "center"
  }
});
