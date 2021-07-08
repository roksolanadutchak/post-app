import React, {useState} from "react";
import { CREATE_POST_INPUT} from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

function Form() {
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
       <form>
           <input type="text" onChange={
               (e) => {
                   setTitle(e.target.value);
               }} />
           <input type="text" onChange={(event => setBody(event.target.value))}/>
           <button onClick={addPost}>Create Post</button>
       </form>
    )
}
export default Form