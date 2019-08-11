import React, { Component } from "react";
import { Link } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// External components
import PerfectScrollbar from "react-perfect-scrollbar";

// Material components, helpers
import {
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

class BookTableList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  };

  static defaultProps = {
    books: []
  };

  renderAuthors = authors => {
    const { classes } = this.props;

    if (!authors) return null;

    const length = Object.keys(authors).length;

    return (
      <div className={classes.authorContainer}>
        {authors.map((author, index) => (
          <Typography
            key={index}
            className={classes.authorName}
            variant="subtitle2"
          >
            {author.name + (index < length - 1 ? ", " : "")}
          </Typography>
        ))}
      </div>
    );
  };

  render() {
    const { books, className, classes } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <MainView className={rootClassName}>
        <MainViewContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Author</TableCell>
                  <TableCell align="left">Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map(book => (
                  <TableRow className={classes.tableRow} hover key={book.id}>
                    <TableCell className={classes.tableCell}>
                      <Link
                        className={classes.link}
                        to={{
                          pathname: "/book",
                          state: {
                            id: book.id,
                            grid: book.grid
                          }
                        }}
                      >
                        <div className={classes.tableCellInner}>
                          <div className={classes.bookImageWrapper}>
                            <img
                              alt={book.title}
                              className={classes.bookImage}
                              src={book.img_thumbnail}
                            />
                          </div>
                          <Typography
                            className={classes.bookTitle}
                            variant="body1"
                          >
                            {book.title}
                          </Typography>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {this.renderAuthors(book.authors)}
                    </TableCell>
                    <TableCell className={classes.tableCell}>Rating</TableCell>
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

export default withStyles(styles)(BookTableList);
