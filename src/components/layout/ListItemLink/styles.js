// Component styles

export default theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 360
  },
  listSubheader: {
    color: theme.palette.text.secondary
  },
  listItem: {
    cursor: "pointer",
    marginBottom: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      "& $listItemIcon": {
        color: theme.palette.primary.main,
      }
    },
  },
  activeListItem: {
    backgroundColor: theme.palette.primary.light,
    "& $listItemText": {
      color: theme.palette.text.primary
    },
    "& $listItemIcon": {
      color: theme.palette.primary.main,
    }
  },
  listItemIcon: {
    marginRight: 0,
    minWidth: "32px"
  },
  listItemText: {
    fontWeight: 500,
    color: theme.palette.text.secondary
  }
});
