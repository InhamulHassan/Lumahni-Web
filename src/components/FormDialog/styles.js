// Component styles

export default theme => ({
  root: {},
  appBar: {
    position: "relative",
    borderBottom: `1px solid ${theme.palette.border}`,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    alignItems: "center",
    height: "64px",
    zIndex: theme.zIndex.appBar
  },
  outerGrid: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`
  },
  iconButton: {
    color: theme.palette.text.primary
  },
  title: {
    marginLeft: theme.spacing(2),
    color: theme.palette.text.primary,
    flex: 1
  }
});
