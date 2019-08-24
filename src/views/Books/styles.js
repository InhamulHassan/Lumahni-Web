// View styles

export default theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  link: {
    textDecoration: "none"
  },
  noResults: {
    margin: "5% 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  tablePagination: {
    position: "relative",
    "& .MuiToolbar-root": {
      color: "#546e7a",
      fontSize: "0.75rem"
    },
    "& .MuiTablePagination-toolbar": {
      padding: "0"
    },
    "& .MuiTablePagination-caption": {
      color: "inherit",
      fontSize: "11px",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
      fontWeight: 400,
      lineHeight: "13px",
      letterSpacing: "0.33px"
    }
  },
  progressWrapper: {
    paddingTop: "48px",
    paddingBottom: "24px",
    display: "flex",
    justifyContent: "center"
  },
  errorWrapper: {
    paddingTop: "40vh",
    paddingBottom: "40vh",
    display: "flex",
    justifyContent: "center"
  },
  pagination: {
    marginTop: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  }
});
