import React, {useState} from "react";
import { CREATE_POST_INPUT} from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

function Form({ setOpenModal }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [createPost, { error }] = useMutation(CREATE_POST_INPUT)
    const addPost = (event) => {
        event.preventDefault()
        createPost({
            variables: {
                input: {
                    title: title,
                    body: body
                }
            }
        });
        if (error){
            console.log(error)
        }
    }
    return (

       <form className="grid ">
           <div className="mt-5">
               <input type="text" onChange={
                   (e) => {
                       setTitle(e.target.value);
                   }} className="form-input px-2 py-1 rounded-md bg-blue-50 placeholder-gray-500 placeholder-opacity-75 w-full" placeholder="title" />
           </div>
           <div className="mt-5">
               <textarea type="text" onChange={(event => setBody(event.target.value))} className="form-input px-2 py-1 rounded-md bg-blue-50 placeholder-gray-500 placeholder-opacity-75 w-full" placeholder="main text"/>
           </div>
           <div className="mt-5 grid  grid-cols-1 md:grid-cols-12 gap-4 ">
               <div className="md:col-start-2 col-span-4">
                   <button onClick={addPost} className="bg-blue-200 rounded ring-2 text-indigo-900 h-7 w-full">Create Post</button>
               </div>
               <div className="col-span-4 "><button
                   onClick={() => {
                       setOpenModal(false);
                   }}
                   className="bg-red-300 rounded ring-red-400  ring-2 text-red-900 h-7 w-full"
               >
                   Cancel
               </button></div>

           </div>

       </form>

    )
}
export default Form