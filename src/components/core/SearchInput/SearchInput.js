import React from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material components, helpers
import {
  Input,
  InputBase,
  MenuItem,
  Select,
  withStyles
} from "@material-ui/core";

// Material icons
import { Search as SearchIcon } from "@material-ui/icons";

// Component styles
import styles from "./styles";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const renderSelectMenu = props => {
  const { selectedValue, onSelectChange, menuItems } = props;
  if (menuItems.length) {
    return (
      <Select
        value={selectedValue}
        displayEmpty
        onChange={onSelectChange}
        input={<BootstrapInput name="age" id="age-customized-select" />}
      >
      <MenuItem value="">
        <em>All</em>
      </MenuItem>
        {menuItems.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    );
  }
};

const SearchInput = props => {
  const {
    classes,
    className,
    onChange,
    selectedValue,
    onSelectChange,
    menuItems,
    style,
    ...rest
  } = props;

  const rootClassName = classNames(classes.root, className);

  return (
    <div className={rootClassName} style={style}>
      <SearchIcon className={classes.icon} />
      <Input
        {...rest}
        className={classes.input}
        disableUnderline
        onChange={onChange}
      />
      {renderSelectMenu(props)}
    </div>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  selectedValue: PropTypes.string,
  onSelectChange: PropTypes.func,
  menuItems: PropTypes.array,
  style: PropTypes.object
};

SearchInput.defaultProps = {
  onChange: () => {},
  selectedValue: "",
  onSelectChange: () => {},
  menuItems: []
};

export default withStyles(styles)(SearchInput);
