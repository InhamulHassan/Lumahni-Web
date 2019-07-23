import React, { Component } from "react";

// Redux Helpers
import { connect } from "react-redux";

// Externals
import PropTypes from "prop-types";

// Material components, helpers
import { IconButton, withStyles } from "@material-ui/core";

// Material icons
import {
  ArrowForwardIosRounded as NextIcon,
  ArrowBackIosRounded as PrevIcon
} from "@material-ui/icons";

// Shared services
import { getGenres } from "../../redux/actions/genreDbAction";

// External Components
import ReactTags from "react-tag-autocomplete";

// Component styles
import styles from "./styles";

class GenreTagChip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: [
        { id: 3, name: "Bananas" },
        { id: 4, name: "Mangos" },
        { id: 5, name: "Lemons" },
        { id: 6, name: "Apricots" }
      ]
    };
  }

  componentDidMount() {
    this.signal = true;
    // const { limit } = this.state;
    this.props.getGenres();
  }

  handleDelete = i => {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  };

  handleAddition = tag => {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
  };

  render() {
    const { classes } = this.props;
    const { suggestions, tags } = this.state;

    return (
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        handleDelete={this.handleDelete}
        handleAddition={this.handleAddition}
      />
    );
  }
}

GenreTagChip.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  getGenres: PropTypes.func.isRequired,
  genre: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

GenreTagChip.defaultProps = {
  open: false,
  close: null,
  bookGrDetails: {},
  id: null,
  loading: false,
  error: null
};

const mapStateToProps = state => {
  return {
    genre: state.genre.data,
    loading: state.genre.dataLoading,
    error: state.genre.error
  };
};

const mapDispatchToProps = {
  getGenres
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GenreTagChip));
