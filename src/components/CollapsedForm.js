import React from "react";
import NewForm from "./NewForm";
import { Form, Input, TextArea, Button, Card } from "semantic-ui-react";

export default class CollapsedForm extends React.Component {
  state = {
    clicked: false
  };

  handleClick = e => {
    let flipped = !this.state.clicked;
    this.setState({
      clicked: flipped
    });
    console.log(this.state.clicked);
  };

  render() {
    const cardGroupStyle = {
      marginTop: "35px",
      marginBottom: "10px"
    };
    const cardMarginStyle = {
      marginLeft: "auto",
      marginRight: "auto",
      padding: "1em",
      width: "750px"
    };

    return (
      <Card.Group style={cardGroupStyle}>
        <Card style={cardMarginStyle}>
          <Card.Content>
            <div>
              <div className="collabsible-header" onClick={this.handleClick}>
                <h1 style={{ margin: "0px" }}>What's on your mind</h1>
                <h3 className="collabsible-button">
                  {this.state.clicked ? "-" : "+"}
                </h3>
              </div>
              {this.state.clicked ? (
                <NewForm
                  handleSubmit={this.props.handleSubmit}
                  topicsList={this.props.topicsList}
                />
              ) : null}
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}
