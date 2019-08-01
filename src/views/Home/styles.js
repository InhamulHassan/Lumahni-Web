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
  progressWrapper: {
    paddingTop: '48px',
    paddingBottom: '24px',
    display: 'flex',
    justifyContent: 'center'
  },
  errorWrapper: {
    paddingTop: "40vh",
    paddingBottom: "40vh",
    display: "flex",
    justifyContent: "center"
  },
  pagination: {
    marginTop: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});
