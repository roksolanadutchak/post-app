import React from "react";
import {useParams} from "react-router";
import {UPDATE_POST} from "../GraphQL/Mutations";
import {useMutation} from "@apollo/client";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const EditSchema = Yup.object().shape({
    body: Yup.string()
        .min(5, 'Too short!')
        .max(75, 'Too long')
        .required('Required!')
        .matches( /^[a-zA-Z\s]*$/, 'Symbols, numbers and cyrillic letters is not allowed')
})

function EditPost(){
    const { id }= useParams();
    const [updatePost] = useMutation(UPDATE_POST);
    return(
        <div>
            <h1>Update post</h1>
            <Formik initialValues={{body: ''}}
                    validationSchema={EditSchema}
                    onSubmit={(values) =>{
                        updatePost({
                            variables: {
                                id: id,
                                input: values
                            }}
                        )
                    }}>
                {({errors, touched }) =>(
                    <Form>
                        <Field name='body' placeholder="Body" className="input"/>
                        {errors.body && touched.body ? <div className="text-red-900">{errors.body}</div> : null}
                        <button type="submit" className="btn btn-submit">Update Todo</button>
                    </Form>
                )}
            </Formik>
        </div>

    )
}
export default EditPost