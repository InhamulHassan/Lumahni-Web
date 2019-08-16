// Component styles

export default theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "transparent"
    }
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: "20px",
    paddingRight: "20px",
    backgroundColor: "transparent",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      padding: "30px 20px",
      borderRadius: "15px",
      boxShadow: "0px 0px 400px 30px rgb(0, 0, 0, 0.8)"
    }
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: 250
    }
  },
  field: {
    marginTop: theme.spacing(2)
  },
  textField: {
    width: "100%",
    "& + & ": {
      marginTop: theme.spacing(2)
    }
  },
  progressWrapper: {
    display: "block",
    marginTop: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%"
  },
  signInButton: {
    marginTop: theme.spacing(2),
    height: 40,
    width: 100,
    background: "linear-gradient(-45deg, #0767DB, #07d3da)",
    backgroundSize: "150%",
    transition: "all 300ms",
    "&:active": {
      background: "linear-gradient(-45deg, #0767DB, #07d3da)",
      backgroundSize: "150%",
      backgroundPositionX: "-30px"
    },
    "&:hover": {
      background: "linear-gradient(-45deg, #0767DB, #07d3da)",
      backgroundSize: "150%",
      backgroundPositionX: "-30px"
    },
    [theme.breakpoints.down("sm")]: {
      width: "40vw",
      minWidth: "100px"
    }
  },
  errorIcon: {
    marginRight: theme.spacing(1)
  },
  fieldError: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    color: theme.palette.danger.main,
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      marginTop: 4,
      marginBottom: 2
    }
  },
  errorContainer: {
    padding: "5px 0"
  },
  submitError: {
    color: theme.palette.danger.main,
    textAlign: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      marginTop: 4,
      marginBottom: 2
    }
  }
});
