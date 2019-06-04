import React from "react"


const LoadingIcon = (props) => {

    switch (props.type) {
        case "ellipsis":
            console.log("Retorno ellipsis")
            return (
                <object width="100" height="100" type="image/svg+xml" data="/img/loading-ellipsis.svg"> </object>
            )
        case "circle":
            return (
                <object width="100" height="100" type="image/svg+xml" data="/img/loading-circle.svg"> </object>
            )

        default:
            return (
                <object width="100" height="100" type="image/svg+xml" data="/img/loading-circle.svg"> </object>
            )
    }
}

export default LoadingIcon