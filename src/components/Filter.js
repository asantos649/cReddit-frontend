import React from "react";

export default class Filter extends React.Component {
  render() {
    return (
      <select className="filter-selector">
        <option>Most Engaged</option>
        <option>Most Agreed With</option>
        <option>Most Disagreed With</option>
      </select>
    );
  }
}
