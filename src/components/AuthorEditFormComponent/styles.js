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
    flexBasis: "100%",
    maxWidth: "100%",
    boxSizing: "border-box"
  },
  groupLabel: {
    color: theme.palette.text.secondary
  },
  generalGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    flexDirection: "column",
    flexGrow: 1,
    padding: theme.spacing(2),
    flexBasis: "100%",
    maxWidth: "100%",
    boxSizing: "border-box"
  },
  generalGroupField: {
    display: "flex",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  },
  textFieldWrapper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column"
  },
  textField: {
    // width: "320px",
    width: "auto",
    maxWidth: "100%",
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      "& $textField": {
        width: "auto"
      }
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  textFieldFull: {
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
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
  searchInputAdornment: {
    width: "50px",
    right: "0",
    justifyContent: "center",
    alignItems: "center"
  },
  authorQuickViewWrapper: {
    margin: "8px 16px",
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  quickViewProgressWrapper: {
    justifyContent: "center",
    alignItems: "center"
  }
});
