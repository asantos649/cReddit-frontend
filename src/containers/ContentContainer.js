import React from "react";
import Post from "../components/Post";

class ContentContainer extends React.Component {
  render() {
    const postComponents = this.props.posts.map(postObj => {
      return (
        <Post
          post={postObj}
          key={postObj.id}
          handleUpvote={this.props.handleUpvote}
          handleDownvote={this.props.handleDownvote}
        />
      );
    });

    return <div>{postComponents}</div>;
  }
}

export default ContentContainer;
