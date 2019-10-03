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
          handleSourceValidate={this.props.handleSourceValidate}
          handleSourceDispute={this.props.handleSourceDispute}
          handleCommentDislike={this.props.handleCommentDislike}
          handleCommentLike={this.props.handleCommentLike}
          key={`${comment.user.username}-${Math.random(10000)}`}
          comment={comment}
          user={this.props.post.user}
          loggedInUser={this.props.loggedInUser}
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
          loggedInUser={this.props.loggedInUser}
          user={this.props.user}
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
