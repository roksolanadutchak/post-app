import React, {useState} from "react";
import {useParams} from "react-router";
import {CREATE_POST_INPUT, UPDATE_POST} from "../GraphQL/Mutations";
import {LOAD_POST} from "../GraphQL/Queries";
import {useMutation, useQuery} from "@apollo/client";
import { Field, Form, Formik } from 'formik';
import {validateBody, validateTitle}  from "../shared/validation"

function AddEditPost(){
    const { id }= useParams();
    const [success, setSuccess] = useState('')
    const {loading, data} = useQuery(LOAD_POST, {
        variables : {
            id: id
        },
        skip: !id
    })
    const [updatePost] = useMutation(UPDATE_POST, {
        onError: (error) => {
            setSuccess(error.message)
        },
        onCompleted: () => {
           setSuccess('Request was successfully completed!')
    }
    });
    const [createPost ] = useMutation(CREATE_POST_INPUT, {
        onError: (error) => {
            setSuccess(error.message)
        },
        onCompleted: () => {
            setSuccess('Request was successfully completed!')
        }
    })

    function onSubmit(values) {
      if (id) {
        updatePost({
          variables: {
            id: id,
            input: {
              ...values,
            },
          },
        });
      } else {
        createPost({
          variables: {
            input: values,
          },
        });
      }
    }   
    if (loading) return 'Loading...';
    return(
        <div className="container mx-auto">
            {id ? <h1 className="text-3xl">Update post</h1> : <h1 className="text-3xl">Create post</h1>}
            <Formik enableReinitialize
                    initialValues={{title: id ? data.post.title : '', body: id ? data.post.body : ''}}
                    onSubmit={({title, body}, {resetForm}) =>{
                        onSubmit({title, body})
                }}>
                {({errors, touched, isValidating }) =>(
                    <Form>
                        <Field name='title'  className="input" validate={validateTitle}/>
                        {errors.title && touched.title && <div className="text-red-900">{errors.title}</div>}
                        <Field name='body'  className="input"  validate={validateBody}/>
                        {errors.body && touched.body && <div className="text-red-900">{errors.body}</div>}
                        {id ? <button type="submit" className="btn btn-submit">Update Post</button> : <button type="submit" className="btn btn-submit">Create Post</button>}
                    </Form>
                )}
            </Formik>
            { <pre className="text-red-900">{success}</pre> }
        </div>

    )
}
export default AddEditPost
