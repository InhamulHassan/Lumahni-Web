import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material components, helpers
import { Button, Dialog, IconButton, withStyles } from "@material-ui/core";

// Material icons
import {
  Delete as DeleteIcon,
  PersonAdd as AddPersonIcon
} from "@material-ui/icons";

// Shared components
import { DisplayModeView, SearchInput } from "../core";
import { FormDialog } from "../FormDialog";
import { AuthorFormComponent } from "../AuthorFormComponent";
import { TransitionSlide as Transition } from "../TransitionSlide";

// Component styles
import styles from "./styles";

class AuthorsToolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleDialogClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleDialogClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const {
      classes,
      className,
      selectedAuthors,
      handleSearch,
      selectedColumn,
      onSelectChange,
      menuItems
    } = this.props;
    const { open } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          {selectedAuthors.length > 0 && (
            <IconButton
              className={classes.deleteButton}
              onClick={this.handleDeleteAuthors}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={this.handleDialogClickOpen}
          >
            <AddPersonIcon className={classes.addIcon} />
            Add Author
          </Button>
          <Dialog
            fullScreen
            open={open}
            onClose={this.handleDialogClose}
            TransitionComponent={Transition}
          >
            <FormDialog title="Author" handleClose={this.handleDialogClose}>
              <AuthorFormComponent
                handleClose={this.handleDialogClose}
                open={open}
              />
            </FormDialog>
          </Dialog>
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search authors"
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

AuthorsToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedAuthors: PropTypes.array,
  handleSearch: PropTypes.func.isRequired,
  selectedColumn: PropTypes.string,
  onSelectChange: PropTypes.func,
  menuItems: PropTypes.array
};

AuthorsToolbar.defaultProps = {
  selectedAuthors: []
};

export default withStyles(styles)(AuthorsToolbar);
