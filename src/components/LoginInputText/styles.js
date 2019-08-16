// Component styles

export default theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    [theme.breakpoints.down("sm")]: {
      width: "50vw",
      minWidth: 200
    }
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  inputIcon: {
    color: "#777777",
    padding: 10
  },
  divider: {
    color: "#777777",
    width: 1,
    height: 28,
    margin: 4
  }
});
