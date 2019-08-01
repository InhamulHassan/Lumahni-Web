import React, { Component } from "react";

// Redux Helpers
import { connect } from "react-redux";

// Externals
import PropTypes from "prop-types";

// Material components, helpers
import { CircularProgress, Typography, withStyles } from "@material-ui/core";

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
      isLoading: false,
      limit: 10,
      authors: [],
      selectedAuthors: [],
      error: null
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

  renderAuthors() {
    const { classes, loading, authors, error } = this.props;

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

    return <AuthorsTableList onSelect={this.handleSelect} authors={authors} />;
  }

  render() {
    const { error, classes } = this.props;
    const { selectedAuthors } = this.state;

    return (
      <CoreLayout title="Authors">
        {error ? (
          <div className={classes.errorWrapper}>
            <Typography variant="h4">{error.message || ""}</Typography>
          </div>
        ) : (
          <div className={classes.root}>
            <AuthorsToolbar selectedAuthors={selectedAuthors} />
            <div className={classes.content}>{this.renderAuthors()}</div>
          </div>
        )}
      </CoreLayout>
    );
  }
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Authors));
