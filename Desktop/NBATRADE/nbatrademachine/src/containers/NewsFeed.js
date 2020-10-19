import React from 'react'

const NewsFeed = props => {
    console.log(props)
    // function getUnique(arr, comp) {
    //     const unique = arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => arr[e]).map(e => arr[e]);
    //     return unique;
    //     }
    
    // let cleanedArticles = getUnique(props.articles, 'title')
    console.log(props.articles)
        return(
            <div>
            <div id="newsfeed">
            <div>Nba Trade News</div>
            {props.articles !== undefined ? props.articles.map(a => <div><a href={a.url}>{a.title}</a></div>) : null}
            </div>
            </div>
        )
}

export default NewsFeed