import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// External Components
import ReactTags from "react-tag-autocomplete";

// Component styles
import "./genreTageChip.css";

class GenreTagChip extends Component {
  render() {
    const {
      genreTags,
      genreSuggesions,
      handleTagDelete,
      handleTagAddition,
      handleTagFocus,
      placeholder
    } = this.props;

    return (
      <ReactTags
        tags={genreTags}
        suggestions={genreSuggesions}
        handleDelete={handleTagDelete}
        handleAddition={handleTagAddition}
        handleFocus={handleTagFocus}
        placeholder={placeholder}
        minQueryLength={1}
        autofocus={false}
      />
    );
  }
}

GenreTagChip.propTypes = {
  genreTags: PropTypes.array.isRequired,
  genreSuggesions: PropTypes.array.isRequired,
  handleTagDelete: PropTypes.func.isRequired,
  handleTagAddition: PropTypes.func.isRequired,
  handleTagFocus: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

GenreTagChip.defaultProps = {
  genreTags: [],
  genreSuggesions: [],
  placeholder: "Add new tags"
}

export default GenreTagChip;
