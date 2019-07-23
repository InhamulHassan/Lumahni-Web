// Layout Styles

export default theme => ({
  header: {
    position: "fixed",
    width: "100%",
    top: 0,
    left: 0,
    right: "auto",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  headerShift: {
    marginLeft: "271px",
    width: "calc(-271px + 100vw)"
  },
  drawerPaper: {
    zIndex: 1200,
    width: "271px"
  },
  sidebar: {
    width: `calc(100% - ${theme.spacing(2)})`
  },
  content: {
    marginTop: "64px",
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    marginLeft: "270px"
  }
});
