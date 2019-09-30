import React from "react";
import IndexContainer from "./IndexContainer";
import {Route, Switch} from 'react-router-dom';
import ShowContainer from './ShowContainer';

class ContentContainer extends React.Component {
  render() {
    return (
        <div>
            <Switch>
                <Route path='/posts/:id' render={({match}) => {

                    let matchingPost = this.props.posts.find(post => parseInt(match.params.id) === post.id)

                    console.log(matchingPost)

                    return <ShowContainer 
                        topicsList={this.props.topicsList}
                        post={matchingPost}
                        handleUpvote={this.props.handleUpvote}
                        handleDownvote={this.props.handleDownvote}
                    />
                }}/>
                <Route exact path='/' render={() => {
                    return <IndexContainer 
                    handleSubmit={this.props.handleSubmit}
                    topicsList={this.props.topicsList}
                    posts={this.props.posts}
                    handleUpvote={this.props.handleUpvote}
                    handleDownvote={this.props.handleDownvote}
                />}}
            />
                
            </Switch>
            
        </div>
    )
  }
}

export default ContentContainer;
