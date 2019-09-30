import React from "react";
import { Form, Input, TextArea, Button, Card, Radio } from "semantic-ui-react";

class NewCommentForm extends React.Component {
  state = {
    content: "",
    source: "",
    is_fact: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state);
    console.log("before", this.state);
  };

  render() {
    const cardGroupStyle = {
      marginTop: "35px"
    };
    const cardMarginStyle = {
      marginLeft: "auto",
      marginRight: "auto",
      padding: "1em",
      width: "750px"
    };

    const selectStyle = {
      height: "2.7em",
      marginTop: "0.3em",
      padding: "1em"
    };

    const buttonStyle = {
      backgroundColor: "#25aae1"
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
        <Form.Field
          name="content"
          id="form-textarea-control-opinion"
          control={TextArea}
          label="Opinion"
          placeholder="Opinion"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <Form.Group label="Fact or Opinion" widths="equal">
          {/* <label htmlFor="topic">Topic</label> */}

          <Form.Field
            name="source"
            id="form-input-control-first-name"
            control={Input}
            label="Source"
            placeholder="Source"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <Form.Field control={Radio} />
        </Form.Group>
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

export default NewCommentForm;
