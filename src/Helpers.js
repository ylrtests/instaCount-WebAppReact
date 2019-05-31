export const URL = "http://instacount:8080/api"
export const getToken = () => {
    return localStorage.getItem("token")
}