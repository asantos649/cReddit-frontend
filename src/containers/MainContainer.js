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

  updateComment = comment => {
    let postId;
    comment.post_id ? (postId = comment.post_id) : (postId = comment.post.id);

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

        let postObj = newPostCollection.find(post => post.id === postId);
        //

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

  handleCommentDislike = comment => {
    comment.downvotes = comment.downvotes += 1;

    this.updateComment(comment);
  };

  handleCommentLike = comment => {
    comment.upvotes = comment.upvotes += 1;

    this.updateComment(comment);
  };

  handleSourceValidate = comment => {
    const newUser = { ...comment.user };

    let newScore = parseInt(newUser.credibility);
    newUser.credibility = newScore += 1;

    fetch(`http://localhost:3000/users/${comment.user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        let newCommentScore = parseInt(comment.source_validated);

        comment.source_validated = newCommentScore += 1;

        this.updateComment(comment);
      });
  };

  handleSourceDispute = comment => {
    const newUser = { ...comment.user };

    let newScore = parseInt(newUser.credibility);
    newUser.credibility = newScore -= 1;

    fetch(`http://localhost:3000/users/${comment.user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        let newCommentScore = parseInt(comment.source_disputed);

        comment.source_disputed = newCommentScore += 1;

        this.updateComment(comment);
      });
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

        console.log("new posts", newPostCollection);
        //
        this.setState({
          postsCollection: newPostCollection
        });
      })
      .catch(console.log);
  };

  handleSubmit = post => {
    // debugger
    if (post.title && post.content && post.topic) {
      let postObj = {
        ...post,
        image_url: "",
        user: this.props.loggedInUser,
        upvotes: 0,
        downvotes: 0
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
          console.log(res);
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
          loggedInUser={this.props.loggedInUser}
          handleSignUp={this.props.handleSignUp}
          handleLogin={this.props.handleLogin}
          handleSourceValidate={this.handleSourceValidate}
          handleSourceDispute={this.handleSourceDispute}
          handleCommentDislike={this.handleCommentDislike}
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
