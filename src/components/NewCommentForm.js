import React from "react";
import { Form, Input, TextArea, Button, Card, Radio, CheckBox } from "semantic-ui-react";

class NewCommentForm extends React.Component {
  state = {
    content: "",
    source: "",
    is_fact: false
  };

  handleChange = e => {
    let key;
    let value;

    ((e.target.innerText === 'Fact') || (e.target.innerText === 'Opinion')) ? (key = 'is_fact') : (key = e.target.name);
    ((e.target.innerText === 'Fact') || (e.target.innerText === 'Opinion')) ? (value = (e.target.innerText === 'Fact')) : (value = e.target.value);
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
      post_id: this.props.post,
    }

    console.log('clicked')
    fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newComment)
      })
        .then(res => res.json())
        .then(res => {
          console.log(res)})
    // const newCommentsList = [...this.props.post.comments, newComment]
    // const newPost = {...this.props.post, comments: newCommentsList}
    // this.props.handleSubmit(newPost);
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

    const radioButtonStyle = {
      display: 'flex',
      justifyContent: 'spaceBetween',
      marginLeft: '.6em'
    }

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
        <Form.Group label="Fact or Opinion" style={{flexDirection: 'column'}}>
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
          <Form.Group className='radio-buttons' style={{flexDirection: 'row'}}>
            <Form.Checkbox 
              label="Fact" 
              control={Radio} 
              style={radioButtonStyle}
              name="is_fact"
              checked={this.state.is_fact}
              onChange={this.handleChange}
              value = {'true'}
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
