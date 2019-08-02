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
      rowsPerPage: 10,
      page: 0
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

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const {
      classes,
      className,
      authors,
      filterQuery,
      selectedColumn
    } = this.props;
    const { activeTab, selectedAuthors, rowsPerPage, page } = this.state;

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
                    // if (activeTab === 1) {
                    //   return !author.returning;
                    // }
                    //
                    // if (activeTab === 2) {
                    //   return author.returning;
                    // }

                    if (!filterQuery) return author;

                    switch (selectedColumn) {
                      case "All":
                        if (
                          author.name
                            .toLowerCase()
                            .includes(filterQuery.toLowerCase())
                        )
                          return author;
                      case "id":
                        if (author.id.toString().includes(filterQuery)) return author;
                      case "grid":
                        if (author.grid.toString().includes(filterQuery)) return author;
                      default:
                        if (
                          author.name
                            .toLowerCase()
                            .includes(filterQuery.toLowerCase())
                        )
                          return author;
                    }

                    // if (filterQuery.length > 2) {
                    //   if (selectedColumn !== "All") {
                    //     console.log(selectedColumn);
                    //     if (
                    //       author[selectedColumn.toString()]
                    //         .toLowerCase()
                    //         .includes(filterQuery.toLowerCase())
                    //     )
                    //       return author;
                    //   } else {
                    //     if (
                    //       author.name
                    //         .toLowerCase()
                    //         .includes(filterQuery.toLowerCase())
                    //     )
                    //       return author;
                    //   }
                    // } else {
                    //   return author;
                    // }

                    // return author;
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
                          <Avatar
                            className={classes.avatar}
                            src={author.img_s}
                          />
                          <Link to="#">
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              {author.name}
                            </Typography>
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
          <TablePagination
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            component="div"
            count={authors.length}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
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
  selectedColumn: PropTypes.string
};

AuthorsTableList.defaultProps = {
  authors: [],
  onSelect: () => {},
  onShowDetails: () => {}
};

export default withStyles(styles)(AuthorsTableList);
