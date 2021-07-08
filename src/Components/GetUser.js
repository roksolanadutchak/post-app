import React, {useEffect} from "react";
import {useQuery, gql, ApolloClient, InMemoryCache} from "@apollo/client";
import {LOAD_USERS} from "../GraphQL/Queries";
function GetUser(){
    const {error, loading, data} = useQuery(LOAD_USERS);
    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <div></div>
    )

}
export default GetUser
