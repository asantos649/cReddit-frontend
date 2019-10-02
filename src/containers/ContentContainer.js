import React from "react";
import IndexContainer from "./IndexContainer";
import { Route, Switch } from "react-router-dom";
import ShowContainer from "./ShowContainer";
import SignUp from '../components/SignUp'

class ContentContainer extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route 
            exact path='/signup'
            render={() => {
              return <SignUp handleSignUp={this.props.handleSignUp} />
            }}
          />
          <Route
            path="/posts/:id"
            render={({ match }) => {
              let matchingPost = this.props.posts.find(
                post => parseInt(match.params.id) === post.id
              );

              return (
                <ShowContainer
                  loggedInUser={this.props.loggedInUser}
                  user={this.props.user}
                  handleSourceValidate={this.props.handleSourceValidate}
                  handleSourceDispute={this.props.handleSourceDispute}
                  handleCommentDislike={this.props.handleCommentDislike}
                  handleCommentLike={this.props.handleCommentLike}
                  topicsList={this.props.topicsList}
                  post={matchingPost}
                  handleUpvote={this.props.handleUpvote}
                  handleDownvote={this.props.handleDownvote}
                  handleSubmit={this.props.handleSubmit}
                  handleCommentSubmit={this.props.handleCommentSubmit}
                />
              );
            }}
          />
          <Route
            exact
            path="/"
            render={() => {
              return (
                <IndexContainer
                  handleSubmit={this.props.handleSubmit}
                  topicsList={this.props.topicsList}
                  posts={this.props.posts}
                  handleUpvote={this.props.handleUpvote}
                  handleDownvote={this.props.handleDownvote}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default ContentContainer;
