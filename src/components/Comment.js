import React from "react";
import { Button, Card } from "semantic-ui-react";

class Comment extends React.Component {
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
    const cardHeaderStyle = {
      fontSize: "1em"
    };
    const cardDescriptionStyle = {
      fontSize: "1em"
    };

    return (
      <Card.Group style={cardGroupStyle}>
        <Card style={cardMarginStyle}>
          <Card.Content extra>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Card.Header style={cardHeaderStyle}>
                {this.props.comment.is_fact ? "Fact" : "Opinion"}
              </Card.Header>
              <Card.Meta>
                @{this.props.user.username} | {this.props.user.credibility} pts
              </Card.Meta>
            </div>
          </Card.Content>
          <Card.Content>
            <Card.Meta>{this.props.comment.created_at}</Card.Meta>
            <Card.Description style={cardDescriptionStyle}>
              {this.props.comment.content}
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
                {this.props.comment.upvotes} Likes
              </Button>
              <Button basic color="red" onClick={this.handleDownvoteClick}>
                {this.props.comment.downvotes} Dislikes
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

export default Comment;
