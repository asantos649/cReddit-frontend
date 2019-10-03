import React from "react";
import { Form, Input, TextArea, Button } from "semantic-ui-react";

class NewForm extends React.Component {
  state = {
    topic: "",
    title: "",
    content: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state);
  };

  render() {
    const selectStyle = {
      height: "2.7em",
      marginTop: "0.3em",
      padding: "1em"
    };

    const buttonStyle = {
      color: "white",
      fontWeight: "800",
      backgroundColor: "#5cd1c5"
    };

    const textStyle = {
      fontSize: "12.5px",
      fontWeight: "700"
    };

    const divStyle = {
      width: "100%"
    };

    const topicsList = [
      { name: "topic", key: "s", text: "Sports", value: "sports" },
      { name: "topic", key: "p", text: "Politics", value: "politics" },
      { name: "topic", key: "c", text: "Culture", value: "culture" },
      { name: "topic", key: "t", text: "Technology", value: "technology" },
      { name: "topic", key: "a", text: "Academic", value: "academics" },
      { name: "topic", key: "o", text: "Other", value: "other" }
    ];

    let renderOptions = topicsList.map(topic => {
      return (
        <option key={topic.key} value={topic.value}>
          {topic.text}
        </option>
      );
    });

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          {/* <label htmlFor="topic">Topic</label> */}
          <div style={divStyle}>
            <label style={textStyle}>Topic</label>
            <select
              label="Topic"
              name="topic"
              placeholder="Topic"
              value={this.state.topic}
              onChange={this.handleChange}
              style={selectStyle}
            >
              <option>Please Select a Topic</option>
              {renderOptions}
            </select>
          </div>
          <Form.Field
            name="title"
            id="form-input-control-first-name"
            control={Input}
            label="Title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Field
          name="content"
          id="form-textarea-control-opinion"
          control={TextArea}
          label="Opinion"
          placeholder="Opinion"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <Form.Field
          id="form-button-control-public"
          control={Button}
          content="Post"
          style={buttonStyle}
          // label="Label with htmlFor"
        />
      </Form>
    );
  }
}

export default NewForm;
