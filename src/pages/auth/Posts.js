import React from "react"
import Header from "../../components/Header"
// import { URL, getToken } from "../../Helpers"
// import axios from "axios"


class Posts extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <div className="posts">
                        <div className="posts-row">
                            <div className="posts-child">
                                <img src="https://www.instagram.com/p/Bxd1GhClLhB/media?size=l" alt="" />
                            </div>
                            <div className="posts-child">
                                <img src="https://www.instagram.com/p/BxOUrgylsbZ/media?size=l" alt="" />
                            </div>
                            <div className="posts-child">
                                <img src="https://www.instagram.com/p/Br1TgMxFF0i/media?size=l" alt="" />
                            </div>
                        </div>
                        <div className="posts-row">
                            <div className="posts-child">
                                <img src="https://www.instagram.com/p/Bxd1GhClLhB/media?size=l" alt="" />
                            </div>
                            <div className="posts-child">
                                <img src="https://www.instagram.com/p/BxOUrgylsbZ/media?size=l" alt="" />
                            </div>
                            <div className="posts-child">
                                <img src="https://www.instagram.com/p/Br1TgMxFF0i/media?size=l" alt="" />
                            </div>
                        </div>
                        <div className="posts-row">
                            <div className="posts-child">
                                <img src="https://www.instagram.com/p/Bxd1GhClLhB/media?size=l" alt="" />
                            </div>
                            <div className="posts-child">
                                <img src="https://www.instagram.com/p/BxOUrgylsbZ/media?size=l" alt="" />
                            </div>
                            <div className="posts-child">
                                <img src="https://www.instagram.com/p/Br1TgMxFF0i/media?size=l" alt="" />
                            </div>
                        </div>
                        

                    </div>
                </div>
            </div>
        )
    }
}

export default Posts