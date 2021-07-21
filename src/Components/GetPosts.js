import React, {useState} from "react";
import {useQuery} from "@apollo/client";
import {Link } from 'react-router-dom';
import {LOAD_POSTS} from "../GraphQL/Queries";
import { default as dismiss } from '../assets/delete.svg';
import { default as pencil} from '../assets/pencil.svg'
import useModal from "../hooks/useModal";
import Modal from "./Modal";

function GetPosts(){
    const {loading, error, data} = useQuery(LOAD_POSTS, { errorPolicy: 'all' } );
    const {isVisible, toggleModal} = useModal();
    const [id, setId] = useState(0)
    if (loading) return 'Loading...';
    function settingId(id){
        setId(id)
    }
    return (
        <div className="container mx-auto ">
            {error && <pre className="text-red-900">{error.message}</pre> }
            <Modal isVisible={isVisible} hideModal={toggleModal} id={id}/>
            <div className="post-wrapper">
                { data && data.posts.data.map(({id, title, body}) => (
                    <div key={id} className="card" >
                        <div className="card-header" onClick={() => settingId(id)}>
                            <div className="col-span-11">
                                <h1 className="text-center">{title}</h1>
                            </div>
                            <div>
                                <button>
                                    <Link to={`/edit/${id}`}><img src={pencil} alt={'update'}/></Link>
                                </button>
                                <button
                                    onClick={toggleModal}>
                                    <img src={dismiss} alt={'delete'}/>
                                </button>
                            </div>
                        </div>
                        <div className="m-3">
                            <p className="text-justify leading-relaxed">{body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default GetPosts
