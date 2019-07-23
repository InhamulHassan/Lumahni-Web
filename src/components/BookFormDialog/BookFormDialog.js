import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// External components
import PerfectScrollbar from "react-perfect-scrollbar";

// Material components, helpers
import {
  Grid,
  IconButton,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";

// Material icons
import { Close as CloseIcon } from "@material-ui/icons";

// Shared components
import { MainViewContent } from "../core";

// Custom components
import { BookFormComponent } from "../BookFormComponent";

// Component styles
import styles from "./styles";

class BookFormDialog extends Component {
  render() {
    const { classes, className, open, handleClose } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
        <MainViewContent className={rootClassName} noPadding>
            <div className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  className={classes.iconButton}
                  onClick={handleClose}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h4" className={classes.title}>
                  Book
                </Typography>
              </Toolbar>
            </div>
            <PerfectScrollbar>
              <div className={classes.root}>
                <Grid className={classes.outerGrid} container>
                  <Grid item md={10} xs={12}>
                    <BookFormComponent handleClose={handleClose} open={open} />
                  </Grid>
                </Grid>
              </div>
            </PerfectScrollbar>
        </MainViewContent>
    );
  }
}

BookFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

BookFormDialog.defaultProps = {
  open: false
};

export default withStyles(styles)(BookFormDialog);
