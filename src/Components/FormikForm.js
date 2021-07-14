import React from "react";
import { useFormik } from "formik";
import { CREATE_POST_INPUT} from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
const validate = values => {
    const errors ={};

    if (!values.title) {
        errors.title = 'Required';
    } else if (values.title.length > 15) {
        errors.title = 'Must be 15 characters or less'
    } else if (/^[а-яА-Я]+$/g.test(values.title)){
        errors.title = 'Only English letter is allowed'
    }

    if(!values.body){
        errors.body = 'Required';
    } else if (values.body.length < 20){
        errors.body = 'Must be 20 characters or more'
    } else if (/^[а-яА-Я]+$/g.test(values.body)){
        errors.body = 'Only English letter is allowed'
    }
    return errors;
}
function FormikForm ({ setOpenModal }) {
    const [createPost, { error }] = useMutation(CREATE_POST_INPUT)

    const formik = useFormik({
        initialValues: {
            title: '',
            body: '',
        },
        validate,
        onSubmit: values => {
            createPost({
                variables: {
                    input: values
                }
            });
            if (error){
                console.log(error)
            }
        }
    })
    return(
        <form onSubmit={formik.handleSubmit}>
           <input
            id="title"
            name="title"
            type="string"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="input"
            placeholder="title"
           />
            {formik.touched.title && formik.errors.title ? <div className="text-red-700">{formik.errors.title}</div> : null}
            <textarea
                id="body"
                name="body"
                type="string"
                onChange={formik.handleChange}
                value={formik.values.body}
                className="input"
                placeholder="title"
            />
            {formik.touched.body && formik.errors.body ? <div className="text-red-700">{formik.errors.body}</div> : null}
            <div className="mt-5 grid  grid-cols-1 md:grid-cols-12 gap-4 ">
                <div className="md:col-start-2 col-span-4">
            <button type="submit" className="btn btn-submit">Submit</button>
                </div>
                <div className="col-span-4 "><button
                onClick={() => {
                    setOpenModal(false);
                }}
                className="btn btn-cancel"
            >
                Cancel
                </button></div>
            </div>
        </form>
    )
}
export default FormikForm