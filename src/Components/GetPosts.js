import React, { useEffect, useState } from "react";
import {useQuery, useMutation} from "@apollo/client";
import {LOAD_POSTS} from "../GraphQL/Queries";
import {DELETE_POST, UPDATE_POST} from "../GraphQL/Mutations";
import { default as dismiss } from '../assets/delete.svg';
import { default as pencil} from '../assets/pencil.svg'

function GetPosts(){
    const {loading,  data} = useQuery(LOAD_POSTS);
    const [deletePost, { error }] = useMutation(DELETE_POST);
    const [updatePost] = useMutation(UPDATE_POST)
    const [modalOpen, setModalOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [bodyUpdate, setBodyUpdate] = useState("")
    useEffect(() => {
        console.log(data)
    }, [data])
    if (loading) return 'Loading...';
    return (
        <div className="container mx-auto ">
            <div className="grid grid-cols-12 ">
                <div className="col-start-5 col-span-4">
                    <button  onClick={() => {
                        setModalOpen(true)}
                    } className="mt-3 bg-blue-300 rounded ring-2 text-indigo-900 h-7 w-full">Add new post</button>
                </div>
            </div>
            <div className="inline-grid grid-cols-1 md:grid-cols-3 gap-x-4 place-items-stretch">
                {data.posts.data.map(({id, title, body}) => (
                    <div key={id} className="shadow-md rounded-md mt-8 bg-blue-100 ">
                        <div className="grid p-2 h-18 rounded-md bg-blue-300 grid-cols-12 ">
                            <div className="col-span-11">
                                <h1 className="text-center">{title}</h1>
                            </div>
                            <div>
                                <button onClick={() => {
                                    setUpdateOpen(true)
                                }}>
                                   <img src={pencil} />
                                </button>
                                <button
                                 onClick={() => {
                                    deletePost({ variables: {id: id } });
                                }}>
                                    <img src={dismiss} />
                                </button>
                            </div>
                        </div>
                        {updateOpen && <form onSubmit={event => {
                            event.preventDefault();
                            updatePost({
                                variables: {
                                    id: id,
                                    input: {
                                        body: bodyUpdate
                                    }
                                }
                            });
                        }
                        }>
                            <input type="text" className="form-input px-2 py-1 rounded-md bg-blue-50 placeholder-gray-500 placeholder-opacity-75 w-full"   onChange={event => {
                                setBodyUpdate(event.target.value)
                            }}
                            />
                            <button type="submit" className="bg-blue-200 rounded ring-2 text-indigo-900 h-5 mt-1">Update Todo</button>
                        </form>
                        }

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
