import React, {Component} from 'react';
import Post from "./components/Post";
import axios from 'axios';
import {connect} from 'react-redux';

class App extends Component {

    constructor(props) {
        super(props);
    };


    fetchPosts() {
        const {setPosts} = this.props
        setPosts([])
        axios.get('https://5ef4b0f2ac6d1e00168ca751.mockapi.io/posts').then(({data}) => {
            setPosts(data);
        });
    }

    render() {
        const {posts: {items}} = this.props
        return (
            <div>
                <div>
                    <button onClick={this.fetchPosts.bind(this)}>click</button>
                    <h3>REgion: {this.props.regions.region}</h3>
                    <ul>
                        <li><button onClick={() => this.props.changeRegion('ING')}>Ing</button></li>
                        <li><button onClick={() => this.props.changeRegion('CHE')}>Chech</button></li>
                        <li><button onClick={() => this.props.changeRegion('DAG')}>Dag</button></li>

                    </ul>
                </div>
                <div>
                    {!items.length ?
                        <span>Loading...</span> : items.map(({title, image, description}, key) => (
                            <Post key={key} title={title} image={image} description={description}/>
                        ))}
                </div>
            </div>
        );
    }


}

const mapStateToProps = props => {
    return {
        ...props
    }
}
const actions = (dispatch) => ({
    setPosts: data =>
        dispatch({
            type: 'SET_POSTS',
            payload: data
        }),
    changeRegion: name =>
        dispatch({
            type: 'CHANGE_REGION',
            payload: name
        })
})

export default connect(mapStateToProps, actions)(App);
