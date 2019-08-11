import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// External Components
import ReactTags from "react-tag-autocomplete";

// Component styles
import "./SuggestionsTagChip.css";

export default class SuggestionsTagChip extends Component {
  render() {
    const {
      tags,
      suggesions,
      handleTagDelete,
      handleTagAddition,
      handleTagFocus,
      placeholder
    } = this.props;

    return (
      <ReactTags
        tags={tags}
        suggestions={suggesions}
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

SuggestionsTagChip.propTypes = {
  tags: PropTypes.array.isRequired,
  suggesions: PropTypes.array.isRequired,
  handleTagDelete: PropTypes.func.isRequired,
  handleTagAddition: PropTypes.func.isRequired,
  handleTagFocus: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

SuggestionsTagChip.defaultProps = {
  tags: [],
  suggesions: [],
  placeholder: "Add new tags"
};
