import React from 'react';
const Like = ({ liked, onClick }) => {
    return (<i className={!liked ? "fa fa-heart-o" : "fa fa-heart"} onClick={onClick} style={{cursor: 'pointer'}} ></i> );
}
 
export default Like;