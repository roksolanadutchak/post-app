import React, { useEffect, useState } from "react";
import {useQuery, useMutation} from "@apollo/client";
import {LOAD_POSTS} from "../GraphQL/Queries";
import Form from "./Form";
import FormikForm from "./FormikForm";
import {DELETE_POST, UPDATE_POST} from "../GraphQL/Mutations";
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
                    {modalOpen && <FormikForm setOpenModal={setModalOpen}/>}
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"
                                         className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                    </svg>
                                </button>
                                <button
                                 onClick={() => {
                                    deletePost({ variables: {id: id } });
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x stroke-current stroke-2 text-blue-600"
                                         viewBox="0 0 16 16">
                                        <path
                                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
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
