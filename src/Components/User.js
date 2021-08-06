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
            <div className="grid-container">
            <div className={posts ? "user-expanded" : "user"}>
                <div className={posts && "user-expanded-text"}>
                    <h1 className="font-bold text-2xl">{username}</h1>
                    <p>{email}</p>
                    <p>lat: {address.geo.lat}</p>
                    <p>lng: {address.geo.lng}</p>
                    {!posts && <button onClick={() => getPosts()} className="btn btn-submit">Show Posts</button>}
                </div>
            </div>
            {posts && posts.user.posts.data.map(({id, title, body}) => (
                <div key={id} className="user-posts">
                    <div className="bg-red-200">
                        <h1 className="user-post-title">{title}</h1>
                    </div>
                    <div className="col-span-2 bg-red-100">
                        <h2 className="user-post-body">{body}</h2>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}
export default User