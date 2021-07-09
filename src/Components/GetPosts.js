import React, { useEffect, useState } from "react";
import {useQuery} from "@apollo/client";
import {LOAD_POSTS} from "../GraphQL/Queries";
import Form from "./Form";

function GetPosts(){
    const {loading,  data} = useQuery(LOAD_POSTS);
    const [modalOpen, setModalOpen] = useState(false)
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
                    {modalOpen && <Form setOpenModal={setModalOpen}/>}
                </div>
            </div>
            <div className="inline-grid grid-cols-1 md:grid-cols-3 gap-x-4 place-items-stretch">
                {data.posts.data.map(({id, title, body}) => (
                    <div key={id} className="shadow-md rounded-md mt-8 bg-blue-100 ">
                        <div className="grid p-2 h-16 rounded-md bg-blue-300 grid-cols-12 ">
                            <div className="col-span-11">
                                <h1 className="text-center">{title}</h1>
                            </div>
                            <div>
                                <button
                                className="ml-7">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x stroke-current stroke-2 text-blue-600"
                                         viewBox="0 0 16 16">
                                        <path
                                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
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
