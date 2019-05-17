import React from 'react';
import Axios from 'axios';

const Logout = (props) => {

    Axios.get(`/api/user/logout`)
    .then(({data}) => {
        setTimeout(() => {
            props.history.push("/")
        }, 3000)
    })
    return (
        <div className="logout_container">
            <h1>Bye</h1>
        </div>
    );
};

export default Logout;