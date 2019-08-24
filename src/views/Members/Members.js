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
  getMembers,
  resetGetMembers
} from "../../redux/actions/memberDbAction";

// Custom components
import { MembersTableList, MembersToolbar } from "../../components";

// Component styles
import styles from "./styles";

class Members extends Component {
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
    this.props.getMembers();
  }

  componentWillUnmount() {
    this.signal = false;
    this.props.resetGetMembers();
  }

  handleSelect = selectedMembers => {
    this.setState({ selectedMembers });
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

  renderMembers() {
    const { classes, members, loading, error } = this.props;
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

    if (members.length === 0) {
      return <Typography variant="h6">There are no members</Typography>;
    }

    return (
      <MembersTableList
        onSelect={this.handleSelect}
        members={members}
        page={page}
        rowsPerPage={rowsPerPage}
        filterQuery={searchQuery}
        selectedColumn={selectedColumn}
      />
    );
  }

  render() {
    const { members, error, classes } = this.props;
    const { page, rowsPerPage, selectedMembers, selectedColumn } = this.state;

    return (
      <CoreLayout title="Members">
        {error ? (
          <div className={classes.errorWrapper}>
            <Typography variant="h4">{error || ""}</Typography>
          </div>
        ) : (
          <div className={classes.root}>
            <MembersToolbar
              handleSearch={this.handleQueryChange}
              selectedMembers={selectedMembers}
              onSelectChange={this.handleSearchSelect}
              selectedColumn={selectedColumn}
              menuItems={[
                { value: "id", name: "Member ID" },
                { value: "name", name: "Member Name" }
              ]}
            />
            <div className={classes.content}>{this.renderMembers()}</div>
            <TablePagination
              className={classes.tablePagination}
              backIconButtonProps={{
                "aria-label": "Previous Page"
              }}
              component="div"
              count={members.length}
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

Members.defaultProps = {
  members: [],
  loading: true,
  error: ""
};

Members.propTypes = {
  classes: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    members: state.member.data,
    loading: state.member.dataLoading,
    error: state.member.error
  };
};

const mapDispatchToProps = {
  getMembers,
  resetGetMembers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Members));
