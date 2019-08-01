import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material components, helpers
import { Button, Dialog, withStyles } from "@material-ui/core";

// Shared components
import { DisplayModeView, SearchInput } from "../core";
import { FormDialog } from "../FormDialog";
import { BookFormComponent } from "../BookFormComponent";
import { TransitionSlide as Transition } from "../TransitionSlide";

// Material icons
import { Add as AddBookIcon } from "@material-ui/icons";

// Component styles
import styles from "./styles";

class BookToolbar extends Component {
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
    const { classes, className } = this.props;
    const { open } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={this.handleDialogClickOpen}
          >
            <AddBookIcon className={classes.addIcon} />
            Add Books
          </Button>
          <Dialog
            fullScreen
            open={open}
            onClose={this.handleDialogClose}
            TransitionComponent={Transition}
          >
            <FormDialog title="Book" handleClose={this.handleDialogClose}>
              <BookFormComponent
                handleClose={this.handleDialogClose}
                open={open}
              />
            </FormDialog>
          </Dialog>
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Enter book title, ISBN"
          />
          <span className={classes.spacer} />
          <DisplayModeView mode="grid" />
        </div>
      </div>
    );
  }
}

BookToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BookToolbar);
