import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material components, helpers
import { Dialog, IconButton, Tooltip, withStyles } from "@material-ui/core";

// Shared components
import { FormDialog } from "../FormDialog";
import { BookEditFormComponent } from "../BookEditFormComponent";
import { TransitionSlide as Transition } from "../TransitionSlide";

// Material icons
import { EditRounded as EditIcon } from "@material-ui/icons";

// Component styles
import styles from "./styles";

class BookEditIcon extends Component {
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
    const { classes, className, bookData } = this.props;
    const { open } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <Tooltip title="Edit Book" aria-label="Edit Book">
          <IconButton
            className={classes.editIconButton}
            onClick={this.handleDialogClickOpen}
            size="medium"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleDialogClose}
          TransitionComponent={Transition}
        >
          <FormDialog title="Edit Book" handleClose={this.handleDialogClose}>
            <BookEditFormComponent
              handleClose={this.handleDialogClose}
              open={open}
              bookPropsData={bookData}
            />
          </FormDialog>
        </Dialog>
      </div>
    );
  }
}

BookEditIcon.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  bookData: PropTypes.object.isRequired
};

export default withStyles(styles)(BookEditIcon);
