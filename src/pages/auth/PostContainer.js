import React from "react"
import {Link} from "react-router-dom"

class PostContainer extends React.Component {
  
      
    render(){
        let imgURL = "https://www.instagram.com/p/"+this.props.id_insta+"/media?size=l"
        let hrefURL = "/posts/"+this.props.id_insta
        return (
            <div className="posts-child">
                <Link to={hrefURL}>
                    <img src={imgURL} alt="img" />
                    <div className="post-tag">{this.props.fans_count}</div>
                </Link>
            </div>
        )
    }
}


export default PostContainer