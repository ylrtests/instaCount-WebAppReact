var arrayUsers = [];
//var posts = ['BxDEbUllSot','BwiiKCUlk20','Bw7OpSlF_tn'];
const url = 'https://www.instagram.com/graphql/query/?query_id=17864450716183058&variables='
//https://www.instagram.com/graphql/query/?query_id=17864450716183058&variables={"shortcode":"BxDEbUllSot","first":"100","after":"QVFBbG84UC1KV09sZ0FUeURuM0pNampOd3MzMlRpSWJrODJTREdFeGJMVzVSSmtwcWZwWUh0NFNEOFdNTVJWdXpNVndpckdFNWNVVWk0SEYwdGoybHA5aA=="}

var hasNextPage = true;

while (hasNextPage){
    document.getElementById('rawdata-tab').click();
    var data = document.getElementsByClassName("data")[0];
    var obj = JSON.parse(data.innerHTML); 
    console.log(obj);

    arrayUsers = arrayUsers.concat(obj);

    let hasNextPage = obj.data.shortcode_media.edge_liked_by.page_info.has_next_page;

    if(hasNextPage){
        let nextRef = obj.data.shortcode_media.edge_liked_by.page_info.end_cursor;
        let tempUrl = url+'{"shortcode":"BxDEbUllSot","first":"50","after":"'+nextRef+'"}'
        window.open(tempUrl, "_self")
    }

}

console.log("obtuve todo...")
console.log(arrayUsers)
