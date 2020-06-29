import React, {Component} from 'react';
import Post from "./components/Post";
import axios from 'axios';
import {connect} from 'react-redux';
import {Container, Header, Item, Button, Segment} from 'semantic-ui-react'

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

    componentWillMount() {
        this.fetchPosts();
    }

    regionText(s) {
        switch (s) {
            case 'ING':
                return 'Ingushetia'
            case 'DAG':
                return 'Dagestan'
            case 'CHE':
                return 'Chechna'

        }
    }

    render() {
        const {posts: {items}} = this.props
        return (
            <Container>
                <Header as='h2'>Region: {this.regionText(this.props.regions.region)}</Header>
                <div>
                    <Button.Group basic>>
                        <Button onClick={() => this.props.changeRegion('ING')}>Ing</Button>
                        <Button onClick={() => this.props.changeRegion('CHE')}>Chech</Button>
                        <Button onClick={() => this.props.changeRegion('DAG')}>Dag</Button>

                    </Button.Group>
                </div>
                <Item.Group divided>
                    {!items.length ?
                        <Segment loading><br/><br/><br/></Segment>  : items.map(({title, image, text, views}, key) => (
                            <Post key={key} title={title} image={image} text={text} views={views}/>
                        ))}
                </Item.Group>

            </Container>
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
