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
  TablePagination,
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
import {
  getBooksByPage,
  resetGetBooksByPage
} from "../../redux/actions/bookDbAction";

// Custom components
import { BookCardGrid, BookToolbar } from "../../components";

// Component styles
import styles from "./styles";

class Books extends Component {
  constructor(props) {
    super(props);

    this.signal = true;
    this.state = {
      page: 0,
      rowsPerPage: 10
    };
  }

  componentDidMount() {
    this.signal = true;
    const { page, rowsPerPage } = this.state;
    this.props.getBooksByPage(page, rowsPerPage);
  }

  componentWillUnmount() {
    this.signal = false;
    this.props.resetGetBooksByPage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.rowsPerPage !== this.state.rowsPerPage
    ) {
      const { page, rowsPerPage } = this.state;
      this.props.getBooksByPage(page, rowsPerPage);
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

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
      <Grid container spacing={1}>
        {books.map(book => (
          <Grid item key={book.id} lg={2} md={3} sm={4} xs={6}>
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
    const { totalResults, error, classes } = this.props;
    const { page, rowsPerPage } = this.state;

    return (
      <CoreLayout title="Books">
        {error ? (
          <div className={classes.errorWrapper}>
            <Typography variant="h4">{error || ""}</Typography>
          </div>
        ) : (
          <div className={classes.root}>
            <BookToolbar />
            <div className={classes.content}>{this.renderBooks()}</div>
            <TablePagination
              className={classes.tablePagination}
              backIconButtonProps={{
                "aria-label": "Previous Page"
              }}
              component="div"
              count={totalResults}
              nextIconButtonProps={{
                "aria-label": "Next Page"
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </div>
        )}
      </CoreLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.book.data,
    totalResults: state.book.totalResults,
    loading: state.book.dataLoading,
    error: state.book.error
  };
};

const mapDispatchToProps = {
  getBooksByPage,
  resetGetBooksByPage
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
