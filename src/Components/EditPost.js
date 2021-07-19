import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {UPDATE_POST} from "../GraphQL/Mutations";
import {useMutation, useQuery} from "@apollo/client";
import { Field, Form, Formik } from 'formik';
import {LOAD_POST} from "../GraphQL/Queries";
import {validateBody, validateTitle}  from "../shared/validation"

function EditPost(){
    const { id }= useParams();
    const {loading,  data} = useQuery(LOAD_POST, {
        variables : {
            id: id
        }
    })
    const [updatePost] = useMutation(UPDATE_POST);
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    useEffect(() => {
        if(data) {
            setTitle(data.post.title)
            setBody(data.post.body)
        }
    }, [data])
    return(
        <div>
            <h1>Update post</h1>
            <Formik enableReinitialize
                initialValues={{body: body, title: title,}}
                    onSubmit={(values, {resetForm}) =>{
                        console.log(values)
                            updatePost({
                                variables: {
                                    id: id,
                                    input: {...values}
                                }}
                            )
                        resetForm({...values})
                    }}>
                {({errors, touched, isValidating }) =>(
                    <Form>
                        <Field name='title'  className="input" validate={validateTitle}/>
                        {errors.title && touched.title && <div className="text-red-900">{errors.title}</div>}
                        <Field name='body'  className="input"  validate={validateBody}/>
                        {errors.body && touched.body && <div className="text-red-900">{errors.body}</div>}
                        <button type="submit" className="btn btn-submit">Update Todo</button>
                    </Form>
                )}
            </Formik>
        </div>

    )
}
export default EditPost