import React from "react";

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
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";

// Material icons
import { Close as CloseIcon } from "@material-ui/icons";

// Shared components
import { MainViewContent } from "../core";

// Component styles
import styles from "./styles";

const FormDialog = props => {
  const { classes, className, title, children, handleClose } = props;
  const rootClassName = classNames(classes.root, className);

  return (
    <MainViewContent className={rootClassName} noPadding>
      <div className={classes.appBar}>
        <Toolbar>
          <Tooltip
            title={`Close ${title} Dialog`}
            aria-label={`Close ${title} Dialog`}
          >
            <IconButton
              edge="start"
              color="inherit"
              className={classes.iconButton}
              onClick={handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h4" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </div>
      <PerfectScrollbar>
        <div className={classes.root}>
          <Grid className={classes.outerGrid} container>
            <Grid item md={10} xs={12}>
              {children}
            </Grid>
          </Grid>
        </div>
      </PerfectScrollbar>
    </MainViewContent>
  );
};

FormDialog.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  handleClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormDialog);
