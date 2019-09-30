import React from "react";
import Topics from "../components/Topics";
import NavBar from "../components/NavBar";
import ContentContainer from "./ContentContainer";
import NewForm from "../components/NewForm";
import CollapsedForm from "../components/CollapsedForm";

class MainContainer extends React.Component {
  state = {
    postCollection: [],
    topicsList: [
      { name: "topic", key: "s", text: "Sports", value: "sports" },
      { name: "topic", key: "p", text: "Politics", value: "politics" },
      { name: "topic", key: "c", text: "Culture", value: "culture" },
      { name: "topic", key: "t", text: "Technology", value: "technology" },
      { name: "topic", key: "a", text: "Academic", value: "academics" },
      { name: "topic", key: "o", text: "Other", value: "other" }
    ]
  };

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
        console.log("fetch data:", data);
        const newArray = [...data];

        // sorting array by most engagement
        newArray.sort(function(a, b) {
          return b.upvotes + b.downvotes - (a.upvotes + a.downvotes);
        });

        this.setState({
          postCollection: newArray
        });
      });
  }

  render() {
    return (
      <div>
        <NavBar />
        <CollapsedForm
          handleSubmit={this.handleSubmit}
          topicsList={this.state.topicsList}
        />
        <Topics />
        <ContentContainer
          handleUpvote={this.handleUpvote}
          posts={this.state.postCollection}
          handleDownvote={this.handleDownvote}
        />
      </div>
    );
  }
}

export default MainContainer;
