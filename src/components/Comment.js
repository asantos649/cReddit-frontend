import React from "react";
import { Button, Card } from "semantic-ui-react";

class Comment extends React.Component {
  handleLike = e => {
    this.props.handleCommentLike(this.props.comment);
    // debugger;
  };

  handleDislike = e => {
    this.props.handleCommentDislike(this.props.comment);
  };

  render() {
    const cardGroupStyle = {
      marginTop: "35px"
    };
    const cardMarginStyle = {
      marginLeft: "auto",
      marginRight: "auto",
      padding: "1em",
      width: "700px"
    };
    const cardHeaderStyle = {
      fontSize: "1em"
    };
    const cardDescriptionStyle = {
      fontSize: "1em",
      marginTop: "1em",
      marginBottom: "1em"
    };

    const sourceDescriptionStyle = {
      fontSize: "1em",

      marginTop: "0.5em",
      marginBottom: "0.5em",
      marginRight: "8.5em"
    };

    const buttonStyle = {
      height: "2em",
      width: "2em"
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
            <Card.Header style={cardDescriptionStyle}>
              {this.props.comment.content}
            </Card.Header>
            <Card.Meta>{this.props.comment.created_at}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button
                basic
                color="green"
                onClick={this.handleLike}
                ref="upvoteButton"
              >
                {this.props.comment.upvotes} Likes
              </Button>
              <Button basic color="red" onClick={this.handleDislike}>
                {this.props.comment.downvotes} Dislikes
              </Button>
            </div>
          </Card.Content>
          {this.props.comment.source ? (
            <Card.Content
              extra
              style={{
                display: "inline-flex",
                justifyContent: "space-between",
                width: "200%",
                height: "3em"
              }}
            >
              <Card.Header style={sourceDescriptionStyle}>
                Source URL:{" "}
                <a target="blank" href={"https://" + this.props.comment.source}>
                  {this.props.comment.source.length > 21
                    ? this.props.comment.source.substring(0, 21).concat("...")
                    : this.props.comment.source}
                </a>
              </Card.Header>
              <div
                className="ui two buttons"
                style={{
                  width: "45%"
                }}
              >
                <Button
                  basic
                  style={buttonStyle}
                  color="blue"
                  onClick={this.handleUpvoteClick}
                  ref="upvoteButton"
                >
                  {this.props.comment.source_validated} Validated
                </Button>
                <Button
                  basic
                  color="red"
                  style={buttonStyle}
                  onClick={this.handleDownvoteClick}
                >
                  {this.props.comment.source_disputed} Disputed
                </Button>
              </div>
            </Card.Content>
          ) : null}
        </Card>
      </Card.Group>
    );
  }
}

export default Comment;
