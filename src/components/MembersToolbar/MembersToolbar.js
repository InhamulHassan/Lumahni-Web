import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material components, helpers
import { Button, IconButton, withStyles } from "@material-ui/core";

// Material icons
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Delete as DeleteIcon,
  PersonAdd as AddPersonIcon
} from "@material-ui/icons";

// Shared components
import { DisplayModeView, SearchInput } from "../core";

// Component styles
import styles from "./styles";

class MembersToolbar extends Component {
  render() {
    const {
      classes,
      className,
      selectedMembers,
      handleSearch,
      selectedColumn,
      onSelectChange,
      menuItems
    } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          {selectedMembers.length > 0 && (
            <IconButton
              className={classes.deleteButton}
              onClick={this.handleDeleteUsers}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <Button
            className={classes.importButton}
            size="small"
            variant="outlined"
          >
            <ArrowDownwardIcon className={classes.importIcon} /> Import
          </Button>
          <Button
            className={classes.exportButton}
            size="small"
            variant="outlined"
          >
            <ArrowUpwardIcon className={classes.exportIcon} />
            Export
          </Button>
          <Button color="primary" size="small" variant="outlined">
            <AddPersonIcon className={classes.addIcon} />
            Add
          </Button>
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search members"
            onChange={handleSearch}
            selectedValue={selectedColumn}
            onSelectChange={onSelectChange}
            menuItems={menuItems}
          />
          <span className={classes.spacer} />
          <DisplayModeView mode="list" />
        </div>
      </div>
    );
  }
}

MembersToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedMembers: PropTypes.array,
  handleSearch: PropTypes.func.isRequired,
  selectedColumn: PropTypes.string,
  onSelectChange: PropTypes.func,
  menuItems: PropTypes.array
};

MembersToolbar.defaultProps = {
  selectedMembers: []
};

export default withStyles(styles)(MembersToolbar);
