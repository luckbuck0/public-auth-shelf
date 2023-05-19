import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button } from '@mui/material';

function ShelfPage() {

  const shelf = useSelector(store => store.shelf)
  console.log('this is the shelf', shelf);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'FETCH_SHELF'
    })
  }, []);

  const deleteItem = id => {
    console.log('Delete item #%o', id);
    dispatch({
      type: 'DELETE_ITEM_FROM_SHELF',
      payload: id
    });
  };

  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>

      {
        shelf.map(item => {
          return (
            <div key={item.id}>
              <img src={item.image_url} alt={item.description} />
              <p>{item.description}</p>
              <Button
                variant="contained"
                onClick={() => deleteItem(item.id)}>
                Delete
              </Button>
            </div>
          )
        })
      }
    </div>
  );
}

export default ShelfPage;
