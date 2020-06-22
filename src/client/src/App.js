import React from 'react';
import Post from "./components/Post";
import posts from './posts.json'

function App() {
    return (
        <div>
            {posts.map(({title, image, description}, key) => (
                <Post key={key} title={title} image={image} description={description}/>

            ))}

        </div>

    );
}

export default App;
