import React, {useState} from "react";
import {useParams} from "react-router";
import {UPDATE_POST} from "../GraphQL/Mutations";
import {useMutation} from "@apollo/client";
import { Field, Form, Formik, FormikProps } from 'formik';

function EditPost(){
    const { id }= useParams();
    const [updatePost] = useMutation(UPDATE_POST);
    const [bodyUpdate, setBodyUpdate] = useState("");
    return(
        <div>
            <h1>Update post</h1>
            <Formik initialValues={{body: ''}}
                    onSubmit={(values) =>{
                        updatePost({
                            variables: {
                                id: id,
                                input: values
                            }
                            }
                        )
                    }}>
                {(props) =>(
                    <Form>
                        <Field name='body' placeholder="Body" className="input"/>
                        <button type="submit" className="btn btn-submit">Update Todo</button>
                    </Form>
                )}
            </Formik>
        </div>

    )
}
export default EditPost