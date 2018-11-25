import React from 'react';
import Pressmark from './Pressmark';

const PressmarkList = ({ pressmarks }) => {

    return (
        <div>
            {pressmarks.map((item, index) => {
                return <Pressmark key={index} {...item}/>
            })}
        </div>
    );
};

export default PressmarkList;