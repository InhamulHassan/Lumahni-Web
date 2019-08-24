import React, { Component } from "react";
import { Link } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";

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

import getInitials from "../../helpers/getInitials";

// Shared components
import { MainView, MainViewContent } from "../core";

// Component styles
import styles from "./styles";

class MembersTableList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMembers: [],
      noResults: false
    };
  }

  handleSelectAll = event => {
    const { members, onSelect } = this.props;

    let selectedMembers;

    if (event.target.checked) {
      selectedMembers = members.map(member => member.id);
    } else {
      selectedMembers = [];
    }

    this.setState({ selectedMembers });

    onSelect(selectedMembers);
  };

  handleSelectOne = (event, id) => {
    const { onSelect } = this.props;
    const { selectedMembers } = this.state;

    const selectedIndex = selectedMembers.indexOf(id);
    let newSelectedMembers = [];

    if (selectedIndex === -1) {
      newSelectedMembers = newSelectedMembers.concat(selectedMembers, id);
    } else if (selectedIndex === 0) {
      newSelectedMembers = newSelectedMembers.concat(selectedMembers.slice(1));
    } else if (selectedIndex === selectedMembers.length - 1) {
      newSelectedMembers = newSelectedMembers.concat(
        selectedMembers.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedMembers = newSelectedMembers.concat(
        selectedMembers.slice(0, selectedIndex),
        selectedMembers.slice(selectedIndex + 1)
      );
    }

    this.setState({ selectedMembers: newSelectedMembers });

    onSelect(newSelectedMembers);
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

  getFullName = member => {
    return member.first_name + " " + member.last_name;
  };

  render() {
    const {
      classes,
      className,
      members,
      filterQuery,
      selectedColumn,
      rowsPerPage,
      page
    } = this.props;

    const { selectedMembers, noResults } = this.state;

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
                      checked={selectedMembers.length === members.length}
                      color="primary"
                      indeterminate={
                        selectedMembers.length > 0 &&
                        selectedMembers.length < members.length
                      }
                      onChange={this.handleSelectAll}
                    />
                    Name
                  </TableCell>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">State</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Registration date</TableCell>
                  <TableCell align="left">Expiration date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members
                  .filter(member => {
                    if (filterQuery) {
                      switch (selectedColumn) {
                        case "name":
                          if (this.isPresent(member.first_name)) {
                            return member;
                          } else {
                            return null;
                          }
                        case "id":
                          if (this.isPresent(member.id)) {
                            return member;
                          } else {
                            return null;
                          }
                        default:
                          if (
                            this.isPresent(member.first_name) ||
                            this.isPresent(member.id)
                          ) {
                            return member;
                          } else {
                            return null;
                          }
                      }
                    } else {
                      return member;
                    }
                  })
                  .slice(rowsPerPage * page, rowsPerPage * (page + 1))
                  .map(member => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={member.id}
                      selected={selectedMembers.indexOf(member.id) !== -1}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          <Checkbox
                            checked={selectedMembers.indexOf(member.id) !== -1}
                            color="primary"
                            onChange={event =>
                              this.handleSelectOne(event, member.id)
                            }
                            value="true"
                          />
                          <Avatar
                            alt={this.getFullName(member)}
                            className={classes.avatar}
                          >
                            {getInitials(this.getFullName(member))}
                          </Avatar>
                          <Link to="#">
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              {this.getFullName(member)}
                            </Typography>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {member.id}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {member.city_id}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {member.email_address}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {member.mobile_number}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(member.join_date).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(member.expiration_date).format("DD/MM/YYYY")}
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

MembersTableList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  members: PropTypes.array.isRequired,
  filterQuery: PropTypes.string,
  selectedColumn: PropTypes.string,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

MembersTableList.defaultProps = {
  members: [],
  onSelect: () => {},
  onShowDetails: () => {}
};

export default withStyles(styles)(MembersTableList);
