// here we add pointers to functions that are called through the controller

// IMPORT requirements
const express = require('express');
const { celebrate, Joi } = require('celebrate');
// IMPORT the controller
const packagesController = require('../controllers/packagesController');
var router = express.Router();

// POST WITH JOI (YAY)
router.post('/', celebrate({
    body: Joi.object({
        city: Joi.string().required(),
        pack_desc: Joi.string().min(5).max(280),
        pack_price: Joi.string().required(),
        pack_type: Joi.string().valid('Hotel', 'Avião', 'Hotel e Avião').required()
    })
}),
packagesController.postPackages
);

router.get('/', packagesController.getPackages);

router.get('/:id', packagesController.getPackagesById);

router.get('/city/:city', packagesController.getPackagesByName);

//router.put('/:id', packagesController.updatePackages);
router.put(
    '/:id',
    celebrate({
      body: Joi.object({
        city: Joi.string(),
        pack_desc: Joi.string().min(5).max(280),
        pack_price: Joi.string(),
        pack_type: Joi.string().valid('Hotel', 'Avião', 'Hotel e Avião')
      })
    }),
    packagesController.updatePackages
  );

router.delete('/:id', packagesController.deletePackages);


// EXPORT the router so we can import it in the server
module.exports = router;