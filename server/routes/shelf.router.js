const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
  rejectUnauthenticated,
}= require('../modules/authentication-middleware')
/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {

  pool.query(`SELECT * FROM "item"`)
    .then((results) => {
      console.log('this is results in the get route for shelf', results.rows);
      res.send(results.rows)
  }). catch ((error) => {
    console.log('whoopsie daisy something is wrong in the shelf get route', error);
    res.sendStatus(500);
  })
   // For testing only, can be removed
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  const userId = req.user.id;
  const newItem = req.body;
  const sqlText = `
    INSERT INTO item 
      (description,image_url, user_id)
    VALUES
      ($1, $2, $3)
  `;
  const sqlValues = [newItem.description, newItem.image_url, userId];

  pool.query(sqlText, sqlValues)
    .then((results) => {
      //If successful, send "Created" status to client
      res.sendStatus(201)
    })
    .catch((error) => {
      console.log('Error inside POST /shelf:', error);
      res.sendStatus(500);
    })
  // endpoint functionality
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const sqlQuery = `SELECT * FROM item
  WHERE "id"=$1`;
  const sqlText = [req.params.id];
  
  // FIRST QUERY SELECTS THE ITEM - 
  pool.query(sqlQuery, sqlText)
  .then(result => {

    if (req.user.id === result.rows[0].user_id) {
      const sqlDelete = `DELETE FROM item
      WHERE "id"=$1`;
      
      // SECOND QUERY TO DELETE ITEM IF USER AUTH'D
      pool.query(sqlDelete, sqlText)
      .then(result => {
        res.sendStatus(200);
      }).catch(err => {
        console.log(err);
        res.sendStatus(500);
      })

    } else {
      res.sendStatus(403);
    }

  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  })

  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  const description = req.body.description;
  const image= req.body.image_url
  const id= req.params.id

  const queryText = `
    UPDATE item 
    SET "description"= $1 , "image_url" = $2 
    WHERE id = $3;
  `
  const queryValues = [ description,image,id];

  pool.query(queryText,queryValues)
  .then(() => {res.sendStatus(200)})
  .catch((error) =>{
    console.log('whoops something went wrong in the put route in shelf router.js');
    res.sendStatus(500);
  })
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
