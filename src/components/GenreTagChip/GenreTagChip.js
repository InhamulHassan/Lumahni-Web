import React, { Component } from "react";

// Redux Helpers
import { connect } from "react-redux";

// Externals
import PropTypes from "prop-types";

// Shared services
import { getGenres } from "../../redux/actions/genreDbAction";

// External Components
import ReactTags from "react-tag-autocomplete";

// Component styles
import "./genreTageChip.css";

class GenreTagChip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      genreSuggesions: [],
      populated: false
    };
  }

  componentDidMount() {
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

  handleFocus = () => {
    if (!this.state.populated) {
      this.populateSuggestions();
    }
  };

  populateSuggestions = () => {
    const { genre, loading } = this.props;
    let genreSuggesions = [];
    for (var i = 0; i < genre.length; ++i) {
      genreSuggesions.push({ id: genre[i]["id"] + 1, name: genre[i]["name"] });
    }

    if (
      !loading &&
      genreSuggesions.length > 0 &&
      this.state.genreSuggesions.length === 0
    ) {
      this.setState({ genreSuggesions, populated: true });
    }
  };

  render() {
    const { genreSuggesions, tags } = this.state;

    return (
      <ReactTags
        tags={tags}
        suggestions={genreSuggesions}
        handleDelete={this.handleDelete}
        handleAddition={this.handleAddition}
        handleFocus={this.handleFocus}
        placeholder="Add new genres"
        minQueryLength={1}
        autofocus={false}
      />
    );
  }
}

GenreTagChip.propTypes = {
  getGenres: PropTypes.func.isRequired,
  genre: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

GenreTagChip.defaultProps = {
  genre: [],
  loading: true,
  error: ""
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
)(GenreTagChip);
