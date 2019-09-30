import React from "react";
import Post from "../components/Post";
import CollapsedForm from "../components/CollapsedForm";
import Filter from "../components/Filter";

class IndexContainer extends React.Component {
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
    
        return (
            <div>
                <CollapsedForm
                    handleSubmit={this.props.handleSubmit}
                    topicsList={this.props.topicsList}
                />
                <Filter />
                {postComponents}
            </div>
        )
    }
}

export default IndexContainer;