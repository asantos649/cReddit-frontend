import React from "react";
import { Button, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { genericTypeAnnotation } from "@babel/types";

class Post extends React.Component {
  handleUpvoteClick = e => {
    e.preventDefault();
    this.props.handleUpvote(this.props.post);
  };

  handleDownvoteClick = e => {
    e.preventDefault();
    this.props.handleDownvote(this.props.post);
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
      fontSize: "1.5em",
      marginBottom: "1em"
    };
    const cardDescriptionStyle = {
      color: "grey",
      fontSize: "1.3em"
    };
    const cardExtraStyle = {
      display: "flex",
      justifyContent: "space-between"
    };

    // STYLES
    return (
      <Card.Group style={cardGroupStyle}>
        <Card style={cardMarginStyle}>
          <Card.Content extra>
            <div style={cardExtraStyle}>
              <Card.Meta>{this.props.post.topic.toUpperCase()}</Card.Meta>
              <Card.Meta>@{this.props.post.user.username}</Card.Meta>
            </div>
          </Card.Content>
          <Card.Content>
            <Link
              to={`/posts/${this.props.post.id}`}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <Card.Header style={cardHeaderStyle}>
                {this.props.post.title}
              </Card.Header>
              <Card.Description style={cardDescriptionStyle}>
                {this.props.post.content}
              </Card.Description>
            </Link>
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
            <Link
              to={`/posts/${this.props.post.id}`}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <Card.Meta style={{ textAlign: "left", marginTop: "1em" }}>
                <img
                  src="/commentIcon.png"
                  alt="comment"
                  style={{
                    height: "1.1em",
                    opacity: "0.4",
                    marginRight: "4px"
                  }}
                ></img>
                {this.props.post.comments ? this.props.post.comments.length : 0}{" "}
                {this.props.post.comments.length === 1 ? "Comment" : "Comments"}
              </Card.Meta>
            </Link>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

export default Post;
