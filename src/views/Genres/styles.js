// View styles
import { keyframes } from "styled-components";

export default theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  divGridList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  mainContent: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "row",
    alignItems: "start"
  },
  genreDetailsContainer: {
    flex: 3,
    margin: "5px 25px 5px 0",
    maxWidth: "350px"
  },
  bookTableContainer: {
    flex: 4,
    margin: "5px 0 5px 25px"
  },
  rootGenreDetails: {
    position: "relative",
    padding: theme.spacing(3),
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  },
  genreImageWrapper: {
    position: "absolute",
    top: "-30px",
    left: "0",
    height: "180px",
    width: "100%",
    borderRadius: "15px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 0px 25px -5px rgba(0,0,0,0.25)",
    backgroundColor: "linear-gradient(to right, #f6f7f9 0%, #e9ebee 20%, #f6f7f9 40%, #f6f7f9 100%)",
    "&:before": {
      content: "''",
      position: "absolute",
      background: "inherit",
      width: "100%",
      height: "100%",
      backgroundAttachment: "fixed",
      filter: "blur(40px)",
      transform: "scale(2) translateY(120px)"
    }
  },
  genreNameContainer: {
    position: "absolute",
    margin: "5px 20px"
  },
  genreName: {
    fontSize: "2.5rem",
    color: "#ffffff",
    textShadow: "0 1px 0 rgba(0, 0, 0, 0.2)",
    marginBottom: theme.spacing(1)
  },
  genreDescriptionContainer: {
    marginTop: "150px",
    textAlign: "justify",
    "& .read-more-button": {
      cursor: "pointer",
      display: "inline-block",
      color: theme.palette.primary.main
    }
  },
  genreDescription: {
    fontSize: "13px"
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
  noResults: {
    paddingTop: "18%",
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
