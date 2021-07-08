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
        <div key={id} class="bg-white dark:bg-gray-800">
            <h1 class="text-gray-900 dark:text-white">{title}</h1>
            <p class="text-gray-600 dark:text-gray-300">{body}</p>
        </div>
    ))
}
export default GetPosts