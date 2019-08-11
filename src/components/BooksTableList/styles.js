// Component styles

export default theme => ({
  root: {},
  tableRow: {
    height: "64px"
  },
  tableCell: {
    whiteSpace: "nowrap"
  },
  link: {
    textDecoration: "none"
  },
  tableCellInner: {
    display: "flex",
    alignItems: "center"
  },
  bookImageWrapper: {
    backgroundColor: theme.palette.primary.main,
    display: "inline-flex",
    fontSize: "14px",
    fontWeight: 500,
    height: "64px",
    width: "42px",
    borderRadius: "5px",
    overflow: "hidden"
  },
  bookImage: {
    width: "100%",
    height: "100%"
  },
  bookTitle: {
    display: "inline-block",
    marginLeft: theme.spacing(2),
    fontWeight: 500,
    cursor: "pointer"
  },
  authorContainer: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
  authorName: {
    display: "inline-block",
    marginRight: theme.spacing(0.5),
    color: theme.palette.text.secondary
  }
});
