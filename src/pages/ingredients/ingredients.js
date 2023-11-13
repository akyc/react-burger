import React from 'react';

const Ingredients = () => {
    const ingredient = JSON.parse(sessionStorage.getItem('ingredient'));
    return (<div>Ingredients</div>)
};

export default Ingredients;
