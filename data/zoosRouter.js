const router = require('express').Router();
const knex = require('knex');


const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3'
  },
  useNullAsDefault: true,
};

//GET REQUESTS

router.get('/', (req, res) => {
  db('zoos')
    .then(zoos => {
      res
        .status(200)
        .json(zoos)
    })
    .catch(error => {
      res
        .status(500)
        .json(error)
    })
});

router.get('/:id', (req, res) => {
  db('zoos')
    .where({
      id: req.params.id
    })
    .first()
    .then(zoo => {
      res
        .status(200)
        .json(zoo)
    })
    .catch(error => {
      res
        .status(500)
        .json(error)
    })
});

// POST REQUESTS

router.post('/', (req, res) => {
  db('zoos')
    .insert(req.body)
    .then(ids => {
      const [id] = ids;

      db('zoos')
        .where({ id })
        .first()
        .then(zoo => {
          res
            .status(200)
            .json(zoo);
        })
    })
    .catch(error => {
      res
        .status(500)
        .json(error);
    })
});

// UPDATE REQUESTS

router.put('/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        db('zoos')
          .where({ id: req.params.id })
          .first()
          .then(zoo => {
            res
              .status(200)
              .json(zoo)
          })
      } else {
        res
          .status(404)
          .json({ 
            message: 'Zoo not found' 
          })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json(error)
    })
});

// REMOVE REQUESTS

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db('zoos')
    .where({ id })
    .del()
    .then(count => {
      if (count > 0) {
        res
          .status(204)
          .json({
            message: 'This zoo has has been deleted.'
          })
      } else {
        res
          .status(404)
          .json({
            message: 'This zoo does not exist.'
          })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json(error)
    })
});

const db = knex(knexConfig);

module.exports = router;