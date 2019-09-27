import React from 'react';

class ContentContainer extends React.Component{
    render(){

        const postComponents = this.props.posts.map(post => {<Post post={post} key={post.id}/>})

        return(
            <div>
                {postComponents}
            </div>
        )
    }
}

export default ContentContainer