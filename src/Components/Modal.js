import React from "react";
import { createPortal } from "react-dom";
import {useMutation} from "@apollo/client";
import {DELETE_POST} from "../GraphQL/Mutations";
import { Field, Form, Formik } from 'formik';
import {validateBody}  from "../shared/validation"

const Modal = ({ isVisible, hideModal, id}) => {
    const [deletePost] = useMutation(DELETE_POST);
    function submit (reason){
        return localStorage.setItem('reason', reason)
    }
    function deletingPost(){
        return deletePost({ variables: {id: id } })
    }
    return isVisible ? createPortal(
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Delete post
                        </h3>
                    </div>
                    <div className="relative p-6 flex-auto">
                        <p>Why do you want delete this post?</p>
                        <div>
                            <Formik
                                initialValues={{reason: ''}}
                                onSubmit={({reason}) => submit(reason)}>
                                {({errors, touched, isValidating }) =>(
                                    <Form>
                                        <Field name="reason" className="input" validate={validateBody}/>
                                        {errors.reason && touched.reason && <div className="text-red-900">{errors.reason}</div>}
                                        <button type="submit" className="btn btn-submit">Send reason</button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                        onClick={deletingPost} className="btn btn-cancel">Delete</button>
                        <button onClick={hideModal} className="btn btn-submit">Close</button>
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    ) : null
}
export default Modal;
