import React, { useEffect, useState } from "react";
import {useQuery, useMutation} from "@apollo/client";
import {Link } from 'react-router-dom';
import {LOAD_POSTS} from "../GraphQL/Queries";
import {DELETE_POST} from "../GraphQL/Mutations";
import { default as dismiss } from '../assets/delete.svg';
import { default as pencil} from '../assets/pencil.svg'

function GetPosts(){
    const {loading,  data} = useQuery(LOAD_POSTS );
    const [deletePost] = useMutation(DELETE_POST);

    if (loading) return 'Loading...';
    return (
        <div className="container mx-auto ">
            <div className="post-wrapper">
                {data.posts.data.map(({id, title, body}) => (
                    <div key={id} className="card" >
                        <div className="card-header">
                            <div className="col-span-11">
                                <h1 className="text-center">{title}</h1>
                            </div>
                            <div>
                                <button>
                                    <Link to={`/edit/${id}`}><img src={pencil} alt={'update'}/></Link>
                                </button>
                                <button
                                 onClick={() => {
                                    deletePost({ variables: {id: id } });
                                }}>
                                    <img src={dismiss} alt={'delete'}/>
                                </button>
                            </div>
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
