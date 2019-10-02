import React from "react";
import NewCommentForm from "./NewCommentForm";
import { Card } from "semantic-ui-react";

export default class CollapsedCommentForm extends React.Component {
  state = {
    clicked: false
  };

  handleClick = e => {
    let flipped = !this.state.clicked;
    this.setState({
      clicked: flipped
    });
  };

  handleSubmit = e => {
    this.props.handleSubmit(e);
  };

  render() {

    console.log(this.props.loggedInUser);
    

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
                <h2>Add a Comment</h2>
                <h3 className="collabsible-button">
                  {this.state.clicked ? "-" : "+"}
                </h3>
              </div>
              {this.state.clicked ? (
                <NewCommentForm
                  loggedInUser={this.props.loggedInUser}
                  handleCommentSubmit={this.props.handleCommentSubmit}
                  handleSubmit={this.handleSubmit}
                  topicsList={this.props.topicsList}
                  post={this.props.post}
                />
              ) : (
                <></>
              )}
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}
