import React, { useEffect } from "react";
import {useQuery} from "@apollo/client";
import {LOAD_POSTS} from "../GraphQL/Queries";
function GetPosts(){
    const {loading,  data} = useQuery(LOAD_POSTS);
    useEffect(() => {
        console.log(data)
    }, [data])
    if (loading) return 'Loading...';
    return (
        <div className="container mx-auto ">
            <div className="inline-grid grid-cols-3 gap-x-4 ">
                {data.posts.data.map(({id, title, body}) => (
                    <div key={id} className="shadow-md rounded-md mt-8 bg-blue-100">
                        <div className="p-2 h-16 rounded-md bg-blue-300 ">
                            <h1 className=" text-center">{title}</h1>
                        </div>
                        <div className="m-3">
                            <p className="text-justify leading-relaxed">{body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default GetPosts
