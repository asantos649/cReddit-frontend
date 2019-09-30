import React from "react";
import { Button, Card } from "semantic-ui-react";

class Post extends React.Component {
  handleUpvoteClick = e => {
    e.preventDefault();
    this.props.handleUpvote(this.props.post);
    // disable button after click
    // this.refs.upvoteButton.setAttribute("disabled", "disabled");
  };

  handleDownvoteClick = e => {
    e.preventDefault();
    this.props.handleDownvote(this.props.post);
    // disable button after click
    // this.refs.upvoteButton.setAttribute("disabled", "disabled");
  };

  render() {
    // STYLES
    const cardGroupStyle = {
      marginTop: "35px"
    };
    const cardMarginStyle = {
      marginLeft: "auto",
      marginRight: "auto",
      padding: "1em",
      width: "750px"
    };
    const cardHeaderStyle = {
      fontSize: "2em"
    };
    const cardDescriptionStyle = {
      fontSize: "1em"
    };
    // STYLES

    return (
      <Card.Group style={cardGroupStyle}>
        <Card style={cardMarginStyle}>
          <Card.Content>
            <Card.Header style={cardHeaderStyle}>
              {this.props.post.title}
            </Card.Header>
            <Card.Meta>@{this.props.post.user.username}</Card.Meta>
            <Card.Meta>{this.props.post.topic}</Card.Meta>
            <Card.Description style={cardDescriptionStyle}>
              {this.props.post.content}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button
                basic
                color="green"
                onClick={this.handleUpvoteClick}
                ref="upvoteButton"
              >
                {this.props.post.upvotes} Likes
              </Button>
              <Button basic color="red" onClick={this.handleDownvoteClick}>
                {this.props.post.downvotes} Dislikes
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

export default Post;
