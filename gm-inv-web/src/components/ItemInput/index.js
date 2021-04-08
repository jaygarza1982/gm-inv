import React, { useEffect } from 'react';

const ItemInput = props => {
    const { apiKey, itemName } = props.match.params;

    useEffect(() => {
        fetch('/api/items/used').then(resp => {
            resp.json().then(json => {
                console.log(json);
            });
        });
    }, []);

    return (
        <div>
            {`${apiKey} ${itemName}`}
        </div>
    );
};
  
export default ItemInput;
