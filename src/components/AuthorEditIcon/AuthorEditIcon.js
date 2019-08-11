import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material components, helpers
import { Dialog, IconButton, Tooltip, withStyles } from "@material-ui/core";

// Shared components
import { FormDialog } from "../FormDialog";
import { AuthorEditFormComponent } from "../AuthorEditFormComponent";
import { TransitionSlide as Transition } from "../TransitionSlide";

// Material icons
import { EditRounded as EditIcon } from "@material-ui/icons";

// Component styles
import styles from "./styles";

class AuthorEditIcon extends Component {
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
    const { classes, className, authorData } = this.props;
    const { open } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <Tooltip title="Edit Author" aria-label="Edit Author">
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
            <AuthorEditFormComponent
              handleClose={this.handleDialogClose}
              open={open}
              authorData={authorData}
            />
          </FormDialog>
        </Dialog>
      </div>
    );
  }
}

AuthorEditIcon.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  authorData: PropTypes.object.isRequired
};

export default withStyles(styles)(AuthorEditIcon);
