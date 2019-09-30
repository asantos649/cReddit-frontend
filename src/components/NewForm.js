import React from "react";
import { Form, Input, TextArea, Button, Card } from "semantic-ui-react";

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
      marginTop: "1.65em",
      padding: "1em"
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
      <Card.Group style={cardGroupStyle}>
        <Card style={cardMarginStyle}>
          <Card.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths="equal">
                <select
                  name="topic"
                  placeholder="Topic"
                  value={this.state.topic}
                  onChange={this.handleChange}
                  style={selectStyle}
                >
                  <option>Please Select a Topic</option>
                  {renderOptions}
                </select>
                {/* <Form.Field
                  name="topic"
                  control={Select}
                  options={topicsList}
                  label={{
                    children: "Topic",
                    htmlFor: "form-select-control-topic"
                  }}
                  placeholder="Topic"
                  search
                  searchInput={{ id: "form-select-control-topic" }}
                  value={this.state.topic}
                  onChange={e =>
                    this.handleChange(e, { topic: this.state.topic })
                  }
                /> */}
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
                content="Confirm"
                // label="Label with htmlFor"
              />
            </Form>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

export default NewForm;
