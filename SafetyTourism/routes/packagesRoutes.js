// here we add pointers to functions that are called through the controller

// IMPORT requirements
const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
// IMPORT the controller
const packagesController = require('../controllers/packagesController');
var router = express.Router();
const admin_funcionarioTokenValidation = require('../middleware/Auth_admin_func');
const adminTokenValidation = require('../middleware/Auth_admin');
const TokenValidation = require('../middleware/Auth_geral');

// POST packages WITH JOI (YAY)
router.post('/', celebrate({
    body: Joi.object({
        city: Joi.string().required(),
        pack_desc: Joi.string().min(5).max(280).regex(/^[a-zA-ZÀ-ÖØ-öø-ÿÇç\s]+$/),
        pack_price: Joi.string().required(),
        pack_type: Joi.string().valid('Hotel', 'Avião', 'Hotel e Avião').required()
    })
}),
admin_funcionarioTokenValidation,
packagesController.postPackages
);

// GET all packages http://localhost:8090/api/packages
router.get('/', admin_funcionarioTokenValidation, packagesController.getPackages);

// GET packages by ID http://localhost:8090/api/packages/:id
router.get('/:id', admin_funcionarioTokenValidation, packagesController.getPackagesById);

// GET packages by city name http://localhost:8090/api/packages/city/:city
router.get('/city/:city', TokenValidation, packagesController.getPackagesByName);

//UPDATE packages by ID 
router.put(
  '/:id',
  (req, res, next) => {
    next();
  },
  
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required()
    }),
    [Segments.BODY]: Joi.object({
      _id: Joi.string().required(),
      city: Joi.string(),
      pack_desc: Joi.string().min(5).max(280),
      pack_price: Joi.string(),
      pack_type: Joi.string().valid('Hotel', 'Avião', 'Hotel e Avião')
    })
  }),
   admin_funcionarioTokenValidation,
   packagesController.updatePackages
);

//DELETE packages by ID 
router.delete('/:id', adminTokenValidation, packagesController.deletePackages);


// EXPORT the router so we can import it in the server
module.exports = router;