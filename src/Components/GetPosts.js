import React, {useEffect, useState} from "react";
import {useQuery, gql} from "@apollo/client";
import {LOAD_POSTS} from "../GraphQL/Queries";
function GetPosts(){
    const {loading, error, data} = useQuery(LOAD_POSTS);
    useEffect(() => {
        console.log(data)
    }, [data])
    if (loading) return 'Loading...';
    return data.posts.data.map(({id, title, body}) => (
        <div key={id}>
            <h1>{title}</h1>
            <p>{body}</p>
        </div>
    ))
}
export default GetPosts