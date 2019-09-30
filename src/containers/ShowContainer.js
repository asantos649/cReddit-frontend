import React from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";

class ShowContainer extends React.Component {
  render() {
      let commentsComponents = null

    console.log(this.props)

    if (this.props.post) {
        commentsComponents = this.props.post.comments.map(comment => <Comment key={comment.id} comment={comment} user={this.props.post.user}/>)
    }

    return (
        
            this.props.post ?
                <div>
                    <Post
                    post={this.props.post}
                //   key={this..id}
                    handleUpvote={this.props.handleUpvote}
                    handleDownvote={this.props.handleDownvote}
                    /> {commentsComponents} 
                    </div>
              :
              (<h1>Loading</h1>)
            
       
    )
  }
}

export default ShowContainer;