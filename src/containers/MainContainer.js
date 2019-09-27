import React from 'react';
import Topics from '../components/Topics'
import NavBar from '../components/NavBar'
import ContentContainer from './ContentContainer'

class MainContainer extends React.Component{

    

    state = {
        postCollection: [],
        topicsList: []

    }

    componentDidMount() {
        fetch('http://localhost:3000/posts')
        .then(resp => resp.json())
        .then(data => {
            const newArray = [...data]
            this.setState ({
                postCollection: newArray
            })
        })
    }
    render(){
        return(
            <div>
                <NavBar />
                <Topics />
                <ContentContainer posts={this.state.postCollection}/>
            </div>
        )
    }
}

export default MainContainer