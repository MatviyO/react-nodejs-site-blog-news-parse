import React  from 'react';

const Post = props => {
    const { title, description, image} = props
    return (
        <div className="post">
            <div style={{backgroundImage: `url(${image})`}} className="post_image"></div>
            <div className="post_info">
                <h2 className="post_title">{title}</h2>
                <p className="post_description" >{description}</p>
            </div>

        </div>
    )
}


export default Post;
