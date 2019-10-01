import React from "react";
import Topics from "../components/Topics";
import NavBar from "../components/NavBar";
import ContentContainer from "./ContentContainer";
// import NewForm from "../components/NewForm";
import { withRouter } from "react-router-dom";

class MainContainer extends React.Component {
  state = {
    postCollection: []
  };

  handleCommentLike = comment => {
    comment.upvotes = comment.upvotes += 1;

    let postId;
    comment.post_id ? (postId = comment.post_id) : (postId = comment.post.id);

    console.log("callback object recieved:", comment);

    fetch(`http://localhost:3000/comments/${comment.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(comment)
    })
      .then(res => res.json())
      .then(res => {
        let newPostCollection = [...this.state.postCollection];
        //
        console.log(comment.post_id);

        let postObj = newPostCollection.find(post => post.id === postId);
        //
        console.log("post obj", postObj);

        let commentInd = postObj.comments.findIndex(c => c.id === comment.id);
        //
        postObj.comments[commentInd] = res;

        //
        let indexPos = this.state.postCollection.findIndex(
          post => post.id === comment.post_id
        );

        newPostCollection[indexPos] = postObj;

        this.setState({
          postsCollection: newPostCollection
        });
      })
      .catch(console.log);
  };

  handleCommentSubmit = comment => {
    let postObj = this.state.postCollection.find(
      post => post.id === comment.post_id
    );

    let indexPos = this.state.postCollection.findIndex(
      post => post.id === comment.post_id
    );

    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(comment)
    })
      .then(res => res.json())
      .then(res => {
        const newCommentsList = [res, ...postObj.comments];
        //
        let newPostCollection = [...this.state.postCollection];
        //
        newPostCollection[indexPos].comments = newCommentsList;
        //
        this.setState({
          postsCollection: newPostCollection
        });
      })
      .catch(console.log);
  };

  // Handle Submit of a new post
  handleSubmit = post => {
    if (post.title && post.content && post.topic) {
      let postObj = {
        ...post,
        image_url: null,
        upvotes: 0,
        downvotes: 0,
        user_id: 3
      };

      fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(postObj)
      })
        .then(res => res.json())
        .then(res => {
          let newArray = [res, ...this.state.postCollection];
          //
          this.setState({
            postCollection: newArray
          });
        });
    }
  };

  handleUpvote = post => {
    // update votecount
    post.upvotes = post.upvotes += 1;
    // pass obj to helper
    this.updatePost(post);
  };

  handleDownvote = post => {
    // update votecount
    post.downvotes = post.downvotes += 1;
    // pass obj to helper
    this.updatePost(post);
  };

  updatePost = updatedObj => {
    fetch(`http://localhost:3000/posts/${updatedObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(updatedObj)
    })
      .then(res => res.json())
      .then(res => {
        // find index position of object within array
        let found = this.state.postCollection.findIndex(
          obj => obj.id === updatedObj.id
        );
        // make copy of state collection
        let newArray = [...this.state.postCollection];
        // update copied array
        newArray[found] = res;
        // setState
        this.setState({
          postCollection: newArray
        });
      })
      .catch(console.log);
  };

  componentDidMount() {
    fetch("http://localhost:3000/posts")
      .then(resp => resp.json())
      .then(data => {
        let newArray = [...data];

        // sorting array by most engagement
        newArray.sort(function(a, b) {
          return b.upvotes + b.downvotes - (a.upvotes + a.downvotes);
        });
        // set state with sorted array
        this.setState({
          postCollection: newArray
        });
      });
  }

  render() {
    return (
      <div>
        <NavBar />
        <Topics />
        <ContentContainer
          handleCommentLike={this.handleCommentLike}
          handleUpvote={this.handleUpvote}
          posts={this.state.postCollection}
          handleDownvote={this.handleDownvote}
          handleSubmit={this.handleSubmit}
          topicsList={this.state.topicsList}
          handleCommentSubmit={this.handleCommentSubmit}
        />
      </div>
    );
  }
}

export default withRouter(MainContainer);
