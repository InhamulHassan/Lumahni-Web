import React, { Component } from "react";
import { Link } from "react-router-dom";

// Redux Helpers
import { connect } from "react-redux";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import {
  IconButton,
  CircularProgress,
  Grid,
  Typography
} from "@material-ui/core";

// Material icons
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from "@material-ui/icons";

// Shared layouts
import { CoreLayout } from "../../layout/CoreLayout";

// Shared services
import { getBooks, resetGetBooks } from "../../redux/actions/bookDbAction";

// Custom components
import { BookCardGrid, BookToolbar } from "../../components";

// Component styles
import styles from "./styles";

class Books extends Component {
  constructor(props) {
    super(props);

    this.signal = true;
    // this.state = {
    //   isLoading: true,
    //   limit: 6,
    //   products: [],
    //   productsTotal: 0,
    //   error: null
    // };
  }

  componentDidMount() {
    this.signal = true;
    // const { limit } = this.state;
    this.props.getBooks();
  }

  componentWillUnmount() {
    this.signal = false;
    this.props.resetGetBooks();
  }

  renderBooks() {
    const { classes, books, loading, error } = this.props;
    if (loading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <div className={classes.progressWrapper}>{error}</div>;
    }

    if (books.length === 0) {
      return (
        <Typography className={classes.noResults} variant="h4">
          There are no books available
        </Typography>
      );
    }

    return (
      <Grid container spacing={3}>
        {books.map(book => (
          <Grid item key={book.id} lg={2} md={4} xs={6}>
            <Link
              className={classes.link}
              to={{
                pathname: "/book",
                state: {
                  id: book.id,
                  grid: book.grid
                }
              }}
            >
              <BookCardGrid book={book} />
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  }

  render() {
    const { error, classes } = this.props;

    return (
      <CoreLayout title="Books">
        {error ? (
          <div className={classes.errorWrapper}>
            <Typography variant="h4">
              {error || ""}
            </Typography>
          </div>
        ) : (
          <div className={classes.root}>
            <BookToolbar />
            <div className={classes.content}>{this.renderBooks()}</div>
            <div className={classes.pagination}>
              <Typography variant="caption">1-6 of 20</Typography>
              <IconButton>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </div>
          </div>
        )}
      </CoreLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.book.data,
    loading: state.book.dataLoading,
    error: state.book.error
  };
};

const mapDispatchToProps = {
  getBooks,
  resetGetBooks
};

Books.defaultProps = {
  books: [],
  loading: true,
  error: ""
};

Books.propTypes = {
  classes: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Books));
