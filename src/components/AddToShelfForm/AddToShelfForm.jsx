import { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddToShelfForm () {

  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [imagePath, setImagePath] = useState('');

  const handleDescription = (event) => {
    setDescription(event.target.value);
  }

  const handleImage = (event) => {
    setImagePath(event.target.value);
  }

  const addItemToShelf = (event) => {
    event.preventDefault();
    const newItem = {
      description: description,
      image_url: imagePath
    }
    if (description !== '' && imagePath !== '') {
      dispatch({
        type: 'ADD_ITEM_TO_SHELF',
        payload: newItem
      })
    }
    else {
      alert('🤬 FILL OUT BOTH INPUT FIELDS. SERIOUSLY...');
    }
  }

  return (
    <>
      <h1>Inside Add To Shelf Form</h1>
      <form>
        <label>Description: </label>
        <textarea
          type='text' 
          placeholder='Item Description'
          onChange={handleDescription}
          value={description}
        /> <br />
        <label>Link to image:</label>
        <input
          type='text' 
          placeholder='http://image_path_here'
          onChange={handleImage}
          value={imagePath}
        /> <br />
        <button onClick={addItemToShelf}>Add Item</button>
      </form>

    </>
  )
}