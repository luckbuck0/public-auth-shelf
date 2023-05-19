import { useState } from "react";
import { useDispatch } from "react-redux";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';
import './AddToShelfForm.css'

export default function AddToShelfForm () {

  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [requiredDescription, setRequiredDescription] = useState(false);
  const [requiredImage, setRequiredImage] = useState(false);

  const handleDescription = (event) => {
    setDescription(event.target.value);
  } // End handleDescription

  const handleImage = (event) => {
    setImagePath(event.target.value);
  } // End handleImage

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
      clearFields();
    }
    else {
      alert('🤬 FILL OUT BOTH INPUT FIELDS. SERIOUSLY...');
      requiredFields();
    }
  } // End addItemToShelf

  const requiredFields = () => {
    if (description === '') {
      setRequiredDescription(true);
    }
    if (imagePath === '') {
      setRequiredImage(true);
    }
  } // End requiredFields

  const clearFields = () => {
    setDescription('')
    setImagePath('')
    setRequiredDescription(false)
    setRequiredImage(false)
  } // End clearFields

  const imageInput = () => {
    // If requiredImage is set to true, render the TextField
    // element with an indication that this field is needed.
    if (requiredImage) {
      return (
        <TextField
          label='http://image_path_here'
          value={imagePath}
          onChange={handleImage}
          helperText='Required Field'
          error
        />
      )
    }
    // Else, render without indicating an error
    else {
      return (
        <TextField
        label='http://image_path_here'
        value={imagePath}
        onChange={handleImage}
        helperText='Required Field'
      />
      )
    }
  } // End imageInput

  const descriptionInput = () => {
    // If requiredDescription is set to true, render the TextField
    // element with an indication that this field is needed.
    if(requiredDescription) {
      return (
        <TextField
          label="Enter Description here"
          placeholder="Enter Description here"
          multiline
          helperText='Required Field'
          value={description}
          onChange={handleDescription}
          error
          InputProps={{
            inputComponent: TextareaAutosize,
            inputProps: {
              style: {
                resize: "auto"
              }
            }
          }}
        />
      )
    }
    // Else, render without indicating an error
    else {
      return (
        <TextField
        label="Enter Description here"
        placeholder="Enter Description here"
        multiline
        helperText='Required Field'
        value={description}
        onChange={handleDescription}
        InputProps={{
          inputComponent: TextareaAutosize,
          inputProps: {
            style: {
              resize: "auto"
            }
          }
        }}
      />
      )
    }
  } // End descriptionInput

  return (
    <div className="box">
      <h3>Add an item to the shelf</h3>
      <form>
        <label>Link to image:</label>
        {imageInput()}
        <br />
        <label>Description: </label>
        {descriptionInput()}
        <br />
        <button onClick={addItemToShelf}>Add Item</button>
      </form>
    </div>
  )
}