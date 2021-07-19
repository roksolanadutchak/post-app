import React from "react";
import {  Field, Formik, Form } from "formik";
import {useMutation} from "@apollo/client";
import {CREATE_POST_INPUT} from "../GraphQL/Mutations";
import {validateBody, validateTitle}  from "../shared/validation"

function AddPost  () {
    const [createPost] = useMutation(CREATE_POST_INPUT)
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
                    {({ errors, touched, isValidating}) => (
                            <Form>
                                <Field name="title" placeholder="Title" className="input" validate={validateTitle} />
                                {errors.title && touched.title && <div className="text-red-900">{errors.title}</div>}
                                <Field name="body" placeholder="Body" className="input" validate={validateBody}/>
                                {errors.body && touched.body && <div className="text-red-900">{errors.body}</div>}
                                <button type="submit" className="btn btn-submit">Submit</button>
                            </Form>
                        )}

                </Formik>
            </div>
        )
}
export default AddPost