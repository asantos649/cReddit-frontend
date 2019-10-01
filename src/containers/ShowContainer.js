import React from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";
import CollapsedCommentForm from "../components/CollapsedCommentForm";

class ShowContainer extends React.Component {
  render() {
    let commentsComponents = null;
    let sortedComments = null;

    if (this.props.post) {
      sortedComments = this.props.post.comments.sort(function(a, b) {
        return b.upvotes + b.downvotes - (a.upvotes + a.downvotes);
      });
      commentsComponents = sortedComments.map(comment => (
        <Comment
          handleCommentLike={this.props.handleCommentLike}
          key={comment.id}
          comment={comment}
          user={this.props.post.user}
        />
      ));
    }

    return this.props.post ? (
      <div>
        <Post
          post={this.props.post}
          //   key={this..id}
          handleUpvote={this.props.handleUpvote}
          handleDownvote={this.props.handleDownvote}
        />
        <CollapsedCommentForm
          handleCommentSubmit={this.props.handleCommentSubmit}
          handleSubmit={this.props.handleSubmit}
          post={this.props.post}
        />
        {commentsComponents}
      </div>
    ) : (
      <h1>Loading</h1>
    );
  }
}

export default ShowContainer;
