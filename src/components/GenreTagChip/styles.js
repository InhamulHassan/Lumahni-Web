// Component styles

export default theme => ({
  root: {
    position: "relative",
    padding: "6px 0 0 6px",
    border: "1px solid #D1D1D1",
    borderRadius: "1px",
    fontSize: "1em",
    lineHeight: "1.2",
    cursor: "text"
  },
  rootFocused: {
    borderColor: "#B1B1B1"
  },
  selected: {
    display: "inline"
  },
  selectedTag: {
    display: "inline-block",
    boxSizing: "border-box",
    margin: "0 6px 6px 0",
    padding: "6px 8px",
    border: "1px solid #D1D1D1",
    borderRadius: "2px",
    background: "#F1F1F1",
    fontSize: "inherit",
    lineHeight: "inherit",
    "&:after": {
      content: "\\2715",
      color: "#AAAAAA",
      marginLeft: theme.spacing(1)
    },
    "&:hover": {
      borderColor: "#B1B1B1"
    },
    "&:focus": {
      borderColor: "#B1B1B1"
    }
  },
  search: {
    display: "inline-block",
    padding: "7px 2px",
    marginBottom: "6px",
    maxWidth: "100%",
    "& input": {
      maxWidth: "100%",
      margin: "0",
      padding: "0",
      border: "0",
      outline: "none",
      fontSize: "inherit",
      lineHeight: "inherit"
    },
    "& input::-ms-clear": {
      display: "none"
    }
  },
  searchInput: {
    maxWidth: "100%",
    margin: "0",
    padding: "0",
    border: "0",
    outline: "none",
    fontSize: "inherit",
    lineHeight: "inherit",
    "&::-ms-clear": {
      display: "none"
    }
  },
  suggestions: {
    position: "absolute",
    top: "100%",
    left: "0",
    width: "100%",
    "& ul": {
      margin: "4px -1px",
      padding: "0",
      listStyle: "none",
      background: "white",
      border: "1px solid #D1D1D1",
      borderRadius: "2px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)"
    },
    "& li": {
      borderBottom: "1px solid #dddddd",
      padding: "6px 8px"
    },
    "& li mark": {
      textDecoration: "underline",
      background: "none",
      fontWeight: "600"
    },
    "& li:hover": {
      cursor: "pointer",
      background: "#eeeeee"
    },
    "& li $suggestionActive": {
      background: "#b7cfe0"
    },
    "& li $suggestionDisabled": {
      opacity: "0.5",
      cursor: "auto"
    }
  },
  suggestionActive: {
    background: "#b7cfe0"
  },
  suggestionDisabled: {
    opacity: "0.5",
    cursor: "auto"
  }
});
