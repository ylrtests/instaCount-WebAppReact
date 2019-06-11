import React from "react"
import { Link } from "react-router-dom"

class PostItem extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isImgHovered: false
        }

        this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this)
        this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this)

    }

    handleOnMouseEnter() {
        this.setState({
            isImgHovered: true
        })
    }

    handleOnMouseLeave() {
        this.setState({
            isImgHovered: false
        })
    }

    render() {
        let detailsImg
        
        if (this.props.requestedIn === "Posts") {
            detailsImg = this.state.isImgHovered ?
                <div className="post-tag">
                    <ul className="list-unstyled text-center">
                        <li>UPDATED AT</li>
                        <li>{this.props.updated_at}</li>
                        <li>LIKES</li>
                        <li>{this.props.fans_count}</li>
                    </ul>
                </div>
                : null
        }


        let imgURL = "https://www.instagram.com/p/" + this.props.id_insta + "/media?size=l"
        let hrefURL = "/posts/show/" + this.props.id_insta

        return (
            <div className="posts-child">
                <Link to={hrefURL} className="post-link">
                    <div className="post-img"
                        onMouseEnter={() => this.handleOnMouseEnter()}
                        onMouseLeave={() => this.handleOnMouseLeave()}
                        style={{ backgroundImage: "url(" + imgURL + ")" }}>
                        {detailsImg}
                    </div>
                </Link>
            </div>
        )
    }
}


export default PostItem