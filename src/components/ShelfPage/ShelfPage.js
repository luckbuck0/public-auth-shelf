import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function ShelfPage() {

const shelf = useSelector(store => store.shelf)
console.log('this is the shelf',shelf); 
const dispatch = useDispatch()

useEffect(() => {
  dispatch({ 
    type: 'FETCH_SHELF'
  })
})

  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>

      {
        shelf.map(item =>{
          return (
            <div key={item.id}>
              <img src={item.image_url} alt={item.description} />
              <p>{item.description}</p>
            </div>
          )
        })
      }
    </div>
  );
}

export default ShelfPage;
