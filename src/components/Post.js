import React  from 'react';
import {  Item, Label, Icon } from 'semantic-ui-react'

const setText = s => s.length >= 300 ? s.substr(0, 300) + ' ...' : s;
const Post = props => {
    const { title, text, image, views} = props
    return (
        <Item>
            <Item.Image src={image} />

            <Item.Content>
                <Item.Header as='a'>{title}</Item.Header>

                <Item.Description>{setText(text)}</Item.Description>
                <Item.Extra>

                    <Label icon="eye" content={`Views: ${views}`} />
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}


export default Post;
