// Component styles

export default theme => ({
  root: {},
  field: {
    margin: theme.spacing(3)
  },
  textField: {
    width: "420px",
    maxWidth: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(3),
    "& > div": {
      color: theme.palette.text.secondary
    }
  },
  mainViewFooter: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
});
