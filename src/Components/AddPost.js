import React from "react";
import {  Field, Formik, Form } from "formik";
import {useMutation} from "@apollo/client";
import {CREATE_POST_INPUT} from "../GraphQL/Mutations";

function AddPost  () {
    const [createPost, { error }] = useMutation(CREATE_POST_INPUT)
    return(
            <div>
                <h1>Add new post</h1>
                <Formik
                    initialValues={{
                        title: '',
                        body: ''
                    }}
                    onSubmit={(values => {
                        createPost({
                            variables: {
                                input: values
                            }
                        })
                    })}
                >
                    {(props) => (
                            <Form>
                                <Field name="title" placeholder="Title" className="input"/>
                                <Field name="body" placeholder="Body" className="input"/>
                                <button type="submit" className="btn btn-submit">Submit</button>
                            </Form>
                        )}

                </Formik>
            </div>
        )
}
export default AddPost