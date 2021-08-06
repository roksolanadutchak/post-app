import React from "react";
import {useParams} from "react-router";
import {useQuery} from "@apollo/client";
import {useLazyQuery} from "@apollo/client";
import {LOAD_USER, LOAD_USER_POSTS} from "../GraphQL/Queries";

function User(){
    const { id }= useParams();
    const {loading: userLoading, data: user} = useQuery(LOAD_USER, {
        variables: {
            id: id
        }
    })
    const [getPosts, { loading: postLoading, data: posts}] = useLazyQuery(LOAD_USER_POSTS, {
        variables: {
            id: id
        }
    })
    console.log(user)
    console.log(posts)
    if (userLoading) return <div className="loader">Loading...</div>;
    if(postLoading) return <div className="loader">Loading...</div>;
    const {username, email, address} = user.user
    return(
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-6 gap-4 md:gap-6 ">
            <div className={posts ? "border col-start-2 col-span-4 row-span-2 bg-red-200" : "border col-start-2 col-span-2 row-span-2 bg-blue-200"}>
                <div className={posts && "relative top-1/3 left-1/3 text-xl"}>
                    <h1 className="font-bold text-2xl">{username}</h1>
                    <p>{email}</p>
                    <p>lat: {address.geo.lat}</p>
                    <p>lng: {address.geo.lng}</p>
                    {!posts && <button onClick={() => getPosts()} className="text-blue-900 border border-blue-900 ">Show Posts</button>}
                </div>
            </div>
            {posts && posts.user.posts.data.map(({id, title, body}) => (
                <div key={id} className="border col-span-2 bg-red-100 grid grid-cols-3">
                    <div className="bg-red-200">
                        <h1 className="font-bold m-2.5 text-center">{title}</h1>
                    </div>
                    <div className="col-span-2 bg-red-100">
                        <h2 className="italic m-2.5 text-justify">{body}</h2>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}
export default User