import React from "react";
import { Form, Input, TextArea, Button, Radio } from "semantic-ui-react";

class NewCommentForm extends React.Component {
  state = {
    content: "",
    source: "",
    is_fact: false
  };

  handleChange = e => {
    let key;
    let value;

    e.target.innerText === "Fact" || e.target.innerText === "Opinion"
      ? (key = "is_fact")
      : (key = e.target.name);
    e.target.innerText === "Fact" || e.target.innerText === "Opinion"
      ? (value = e.target.innerText === "Fact")
      : (value = e.target.value);
    this.setState({
      [key]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newComment = {
      ...this.state,
      upvotes: 0,
      downvotes: 0,
      source_validated: 0,
      source_disputed: 0,
      user_id: 2,
      post_id: this.props.post.id
    };

    this.props.handleCommentSubmit(newComment);
  };

  render() {
    const buttonStyle = {
      backgroundColor: "#25aae1"
    };

    const radioButtonStyle = {
      display: "flex",
      justifyContent: "spaceBetween",
      marginLeft: ".6em",
      marginTop: "2em"
    };

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
        <Form.Group label="Fact or Opinion" style={{ flexDirection: "column" }}>
          {/* <label htmlFor="topic">Topic</label> */}

          <Form.Field
            name="source"
            id="form-input-control-first-name"
            control={Input}
            label="Please add a link to a resource that validates your claim."
            placeholder="Source URL"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <Form.Group
            className="radio-buttons"
            style={{ flexDirection: "row" }}
          >
            <Form.Checkbox
              label="Fact"
              control={Radio}
              style={radioButtonStyle}
              name="is_fact"
              checked={this.state.is_fact}
              onChange={this.handleChange}
              value={"true"}
            />
            <Form.Field
              label="Opinion"
              control={Radio}
              style={radioButtonStyle}
              name="isFact"
              checked={!this.state.is_fact}
              onChange={this.handleChange}
            />
          </Form.Group>
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
