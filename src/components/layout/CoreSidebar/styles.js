// Component styles

export default theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "63px",
    flexShrink: 0
  },
  logoLink: {
    fontSize: 0,
    textDecoration: "none"
  },
  logoImage: {
    cursor: "pointer",
    height: "40px"
  },
  logoDivider: {
    marginBottom: theme.spacing(2)
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content"
  },
  avatar: {
    width: "100px",
    height: "100px"
  },
  nameText: {
    marginTop: theme.spacing(2)
  },
  bioText: {},
  profileDivider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  listSubheader: {
    color: theme.palette.text.secondary
  },
  listDivider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
});
