import React from "react"

const PostContainer = (props) => {
    let imgURL = "https://www.instagram.com/p/"+props.id_insta+"/media?size=l"
    return (
        <div className="posts-child">
            <img src={imgURL} alt="img" />
        </div>
    )
}


export default PostContainer