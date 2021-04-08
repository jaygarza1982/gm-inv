import React from 'react';

const ItemInput = props => {
    const { apiKey, itemName } = props.match.params;

    return (
        <div>
            {`${apiKey} ${itemName}`}
        </div>
    );
};
  
export default ItemInput;