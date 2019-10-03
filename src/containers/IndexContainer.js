import React from "react";
import Post from "../components/Post";
import CollapsedForm from "../components/CollapsedForm";
import Filter from "../components/Filter";

class IndexContainer extends React.Component {
  state = {
    filter: "engaged",
    sortedPostCollection: []
  };

  handleFilter = value => {
    this.setState({
      filter: value
    });
  };

  componentWillUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        sortedPostCollection: [...this.props.posts]
      });
    }
  }

  render() {
    let sortedPosts = [];

    switch (this.state.filter) {
      case "unpopular":
        let unpopularArray = [...this.props.posts];
        sortedPosts = unpopularArray.sort(function(a, b) {
          return b.downvotes - a.downvotes;
        });

        break;
      case "engaged":
        let newArray = [...this.props.posts];
        // sorting array by most engagement
        sortedPosts = newArray.sort(function(a, b) {
          return b.upvotes + b.downvotes - (a.upvotes + a.downvotes);
        });
        break;
      case "popular":
        let popularArray = [...this.props.posts];
        sortedPosts = popularArray.sort(function(a, b) {
          return b.upvotes - a.upvotes;
        });

        break;
      default:
        break;
    }

    const postComponents = sortedPosts.map(postObj => {
      return (
        <Post
          post={postObj}
          key={postObj.id}
          handleUpvote={this.props.handleUpvote}
          handleDownvote={this.props.handleDownvote}
        />
      );
    });

    return sortedPosts.length === 0 ? (
      <h1>Loading...</h1>
    ) : (
      <div>
        <CollapsedForm
          handleSubmit={this.props.handleSubmit}
          topicsList={this.props.topicsList}
        />
        <Filter handleFilter={this.handleFilter} />
        {postComponents}
      </div>
    );
  }
}

export default IndexContainer;
