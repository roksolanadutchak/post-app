import React from "react";
import {useQuery} from "@apollo/client";
import {LOAD_USERS} from "../GraphQL/Queries";
import {Link} from "react-router-dom";
function UsersList(){
    const {loading, data} = useQuery(LOAD_USERS, {errorPolicy: 'all'});
    if (loading) return <div className="loader">Loading...</div>;
    return (
        <div className="container mx-auto">
            <div className="users-list">
                {data && data.users.data.map(({id, username}) => (
                    <div key={id} >
                        <Link to={`/user/${id}`}>
                            {username}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default UsersList