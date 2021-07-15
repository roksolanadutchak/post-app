import React from "react";
import {  Field, Formik, Form } from "formik";
import {useMutation} from "@apollo/client";
import {CREATE_POST_INPUT} from "../GraphQL/Mutations";
import * as Yup from 'yup';
const createSchema = Yup.object().shape({
    title: Yup.string()
        .min(5, 'Too short!')
        .max(25, 'Too long')
        .required('Required!')
        .matches( /^[a-zA-Z\s]*$/, 'Symbols, numbers and cyrillic letters is not allowed'),
    body: Yup.string()
        .min(5, 'Too short!')
        .max(75, 'Too long')
        .required('Required!')
        .matches( /^[a-zA-Z\s]*$/, 'Symbols, numbers and cyrillic letters is not allowed')
})
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
                    validationSchema={createSchema}
                    onSubmit={(values => {
                        createPost({
                            variables: {
                                input: values
                            }
                        })
                    })}
                >
                    {({ errors, touched}) => (
                            <Form>
                                <Field name="title" placeholder="Title" className="input"/>
                                {errors.title && touched.title ? (
                                    <div className="text-red-900">{errors.title}</div>
                                ) : null}
                                <Field name="body" placeholder="Body" className="input"/>
                                {errors.body && touched.body ? (
                                    <div className="text-red-900">{errors.body}</div>
                                ): null}
                                <button type="submit" className="btn btn-submit">Submit</button>
                            </Form>
                        )}

                </Formik>
            </div>
        )
}
export default AddPost