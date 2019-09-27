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
            this.setState ({
                postCollection: data
            })
            console.log(data)
        })
    }
    render(){
        return(
            <div>
                <NavBar />
                <Topics />
            </div>
        )
    }
}

export default MainContainer