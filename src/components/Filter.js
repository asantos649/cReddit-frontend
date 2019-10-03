import React from "react";

export default class Filter extends React.Component {
  state = {
    filterValue: "engaged"
  };

  handleChange = e => {
    this.setState({
      filterValue: e.target.value
    });
    this.props.handleFilter(e.target.value);
  };

  render() {
    return (
      <select
        onChange={this.handleChange}
        name="filterValue"
        className="filter-selector"
      >
        <option value="engaged">Most Engaged</option>
        <option value="popular">Most Likes</option>
        <option value="unpopular">Most Dislikes</option>
      </select>
    );
  }
}
