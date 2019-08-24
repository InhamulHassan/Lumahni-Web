import React, { Component } from "react";

// Redux Helpers
import { connect } from "react-redux";

// Externals
import PropTypes from "prop-types";

// Material components, helpers
import {
  CircularProgress,
  TablePagination,
  Typography,
  withStyles
} from "@material-ui/core";

// Shared layouts
import { CoreLayout } from "../../layout/CoreLayout";

// Shared services
import {
  getAuthors,
  resetGetAuthors
} from "../../redux/actions/authorDbAction";

// Custom components
import { AuthorsTableList, AuthorsToolbar } from "../../components";

// Component styles
import styles from "./styles";

class Authors extends Component {
  constructor(props) {
    super(props);
    this.signal = true;

    this.state = {
      page: 0,
      rowsPerPage: 10,
      selectedAuthors: [],
      searchQuery: "",
      selectedColumn: ""
    };
  }

  componentDidMount() {
    this.signal = true;
    this.props.getAuthors();
  }

  componentWillUnmount() {
    this.signal = false;
    this.props.resetGetAuthors();
  }

  handleSelect = selectedAuthors => {
    this.setState({ selectedAuthors });
  };

  handleQueryChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearchSelect = event => {
    this.setState({ selectedColumn: event.target.value });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  renderAuthors() {
    const { classes, authors, loading, error } = this.props;
    const { page, rowsPerPage, searchQuery, selectedColumn } = this.state;

    if (loading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (authors.length === 0) {
      return <Typography variant="h6">There are no authors found</Typography>;
    }

    return (
      <AuthorsTableList
        onSelect={this.handleSelect}
        authors={authors}
        page={page}
        rowsPerPage={rowsPerPage}
        filterQuery={searchQuery}
        selectedColumn={selectedColumn}
      />
    );
  }

  render() {
    const { authors, error, classes } = this.props;
    const { page, rowsPerPage, selectedAuthors, selectedColumn } = this.state;

    return (
      <CoreLayout title="Authors">
        {error ? (
          <div className={classes.errorWrapper}>
            <Typography variant="h4">{error || ""}</Typography>
          </div>
        ) : (
          <div className={classes.root}>
            <AuthorsToolbar
              handleSearch={this.handleQueryChange}
              selectedAuthors={selectedAuthors}
              onSelectChange={this.handleSearchSelect}
              selectedColumn={selectedColumn}
              menuItems={[
                { value: "id", name: "Author ID" },
                { value: "name", name: "Author Name" },
                { value: "grid", name: "Goodreads ID" }
              ]}
            />
            <div className={classes.content}>{this.renderAuthors()}</div>
            <TablePagination
              className={classes.tablePagination}
              backIconButtonProps={{
                "aria-label": "Previous Page"
              }}
              component="div"
              count={authors.length}
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

Authors.defaultProps = {
  authors: [],
  loading: true,
  error: ""
};

Authors.propTypes = {
  classes: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    authors: state.author.data,
    loading: state.author.dataLoading,
    error: state.author.error
  };
};

const mapDispatchToProps = {
  getAuthors,
  resetGetAuthors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Authors));
