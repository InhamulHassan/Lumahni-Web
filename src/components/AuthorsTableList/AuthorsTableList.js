import React, { Component } from "react";
import { Link } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// External components
import PerfectScrollbar from "react-perfect-scrollbar";

// Material components, helpers
import {
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  withStyles
} from "@material-ui/core";

// Shared components
import { MainView, MainViewContent } from "../core";

// Component styles
import styles from "./styles";

class AuthorsTableList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAuthors: [],
      noResults: false
    };
  }

  handleSelectAll = event => {
    const { authors, onSelect } = this.props;

    let selectedAuthors;

    if (event.target.checked) {
      selectedAuthors = authors.map(author => author.id);
    } else {
      selectedAuthors = [];
    }

    this.setState({ selectedAuthors });

    onSelect(selectedAuthors);
  };

  handleSelectOne = (event, id) => {
    const { onSelect } = this.props;
    const { selectedAuthors } = this.state;

    const selectedIndex = selectedAuthors.indexOf(id);
    let newSelectedAuthors = [];

    if (selectedIndex === -1) {
      newSelectedAuthors = newSelectedAuthors.concat(selectedAuthors, id);
    } else if (selectedIndex === 0) {
      newSelectedAuthors = newSelectedAuthors.concat(selectedAuthors.slice(1));
    } else if (selectedIndex === selectedAuthors.length - 1) {
      newSelectedAuthors = newSelectedAuthors.concat(
        selectedAuthors.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedAuthors = newSelectedAuthors.concat(
        selectedAuthors.slice(0, selectedIndex),
        selectedAuthors.slice(selectedIndex + 1)
      );
    }

    this.setState({ selectedAuthors: newSelectedAuthors });

    onSelect(newSelectedAuthors);
  };

  isPresent = value => {
    const { filterQuery } = this.props;
    const val = value.toString().toLowerCase();
    const query = filterQuery.toString().toLowerCase();
    if (val.includes(query)) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const {
      classes,
      className,
      authors,
      filterQuery,
      selectedColumn,
      rowsPerPage,
      page
    } = this.props;

    const { selectedAuthors, noResults } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <MainView className={rootClassName}>
        <MainViewContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Checkbox
                      checked={selectedAuthors.length === authors.length}
                      color="primary"
                      indeterminate={
                        selectedAuthors.length > 0 &&
                        selectedAuthors.length < authors.length
                      }
                      onChange={this.handleSelectAll}
                    />
                    Name
                  </TableCell>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">GRID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {authors
                  .filter(author => {
                    if (filterQuery) {
                      switch (selectedColumn) {
                        case "name":
                          if (this.isPresent(author.name)) {
                            return author;
                          } else {
                            return null;
                          }
                        case "id":
                          if (this.isPresent(author.id)) {
                            return author;
                          } else {
                            return null;
                          }
                        case "grid":
                          if (this.isPresent(author.grid)) {
                            return author;
                          } else {
                            return null;
                          }
                        default:
                          if (
                            this.isPresent(author.name) ||
                            this.isPresent(author.id) ||
                            this.isPresent(author.grid)
                          ) {
                            return author;
                          } else {
                            return null;
                          }
                      }
                    } else {
                      return author;
                    }
                  })
                  .slice(rowsPerPage * page, rowsPerPage * (page + 1))
                  .map(author => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={author.id}
                      selected={selectedAuthors.indexOf(author.id) !== -1}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          <Checkbox
                            checked={selectedAuthors.indexOf(author.id) !== -1}
                            color="primary"
                            onChange={event =>
                              this.handleSelectOne(event, author.id)
                            }
                            value="true"
                          />
                          <Link
                            className={classes.link}
                            to={{
                              pathname: "/author",
                              state: {
                                id: author.id,
                                grid: author.grid
                              }
                            }}
                          >
                            <div className={classes.tableCellInner}>
                              <Avatar
                                className={classes.avatar}
                                src={author.img_s}
                              />
                              <Typography
                                className={classes.nameText}
                                variant="body1"
                              >
                                {author.name}
                              </Typography>
                            </div>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {author.id}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {author.grid}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </PerfectScrollbar>
        </MainViewContent>
      </MainView>
    );
  }
}

AuthorsTableList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  authors: PropTypes.array.isRequired,
  filterQuery: PropTypes.string,
  selectedColumn: PropTypes.string,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

AuthorsTableList.defaultProps = {
  authors: [],
  onSelect: () => {},
  onShowDetails: () => {}
};

export default withStyles(styles)(AuthorsTableList);
