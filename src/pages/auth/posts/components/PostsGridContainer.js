import React from "react"
import PostItem from "./PostItem"


class PostsGridContainer extends React.Component {

    constructor(props) {
        super(props)

        this.listPostsComponent = this.listPostsComponent.bind(this)
        this.storeRows = this.storeRows.bind(this)
    }

    listPostsComponent(e) {
        // Si la petición se hace desde el componente FansPosts retorna un componente con menos datos
        if(this.props.requestedIn === "FansPosts"){
            return (<PostItem key={e.id} id_insta={e.id_insta} requestedIn={this.props.requestedIn}/>)
        }
        else{
            let lastIndex = e.updated_at.lastIndexOf(" ");
            let reducedString = e.updated_at.substring(0, lastIndex);
            return (<PostItem key={e.id} id_insta={e.id_insta} fans_count={e.fans_count} updated_at={reducedString} requestedIn="Posts"/>)
        }
    }

    storeRows(posts, key) {
        let postsForRow = posts.splice(0, 3)

        if (postsForRow.length === 1) {
            return (
                <div className="posts-row" key={key}>
                    {postsForRow}
                    <div className="posts-child"></div>
                    <div className="posts-child"></div>
                </div>
            )
        }
        else if (postsForRow.length === 2) {
            return (
                <div className="posts-row" key={key}>
                    {postsForRow}
                    <div className="posts-child"></div>
                </div>
            )
        }

        return (
            <div className="posts-row" key={key}>
                {postsForRow}
            </div>
        )
    }

    render() {

        let posts = this.props.posts.map((e) => this.listPostsComponent(e))
        let rows = []

        //LLama a la función storeRows, donde va dividiendo los posts
        //Y asi poder crear las filas que se mostrarán
        for (let i = 0; i < this.props.numberOfRows; i++) {
            let row = this.storeRows(posts, i)
            rows.push(row)
        }

        return (
            <div className="posts">
                {rows}
            </div>
        )

    }
}

export default PostsGridContainer