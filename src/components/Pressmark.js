import React from 'react';
import {Link } from "react-router-dom";


const Pressmark = (props) => {
    return (
      <div>
      <Link to={`/calculate/${props.id}`}><h4>{props.pressmark}</h4></Link>
      </div>
    )
  }
  
  export default Pressmark