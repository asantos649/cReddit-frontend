import React from "react";
import Post from "../components/Post";

class ShowContainer extends React.Component {
  render() {

    console.log(this.props)

    return (
        <div>
            {this.props.post ?
                <Post
                post={this.props.post}
              //   key={this..id}
                handleUpvote={this.props.handleUpvote}
                handleDownvote={this.props.handleDownvote}
              /> :
              (<h1>Loading</h1>)
              }
            
        </div>
    )
  }
}

export default ShowContainer;