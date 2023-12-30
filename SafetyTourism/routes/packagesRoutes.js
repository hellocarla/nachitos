// here we add pointers to functions that are called through the controller

// IMPORT requirements
const express = require('express');
const { celebrate, Joi } = require('celebrate');
// IMPORT the controller
const packagesController = require('../controllers/packagesController');
var router = express.Router();
const admin_funcionarioTokenValidation = require('../middleware/Auth_admin_func');
const adminTokenValidation = require('../middleware/Auth_admin');
const TokenValidation = require('../middleware/Auth_geral');

// POST WITH JOI (YAY)
router.post('/', celebrate({
    body: Joi.object({
        cityId: Joi.string().required(),
        pack_desc: Joi.string().min(5).max(280).regex(/^[a-zA-ZÀ-ÖØ-öø-ÿÇç\s]+$/),
        pack_price: Joi.string().required(),
        pack_type: Joi.string().valid('Hotel', 'Avião', 'Hotel e Avião').required()
    })
}),
admin_funcionarioTokenValidation,
packagesController.postPackages
);

router.get('/', admin_funcionarioTokenValidation, packagesController.getPackages);

router.get('/:id', admin_funcionarioTokenValidation, packagesController.getPackagesById);

router.get('/city/:city', TokenValidation, packagesController.getPackagesByName);

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
    admin_funcionarioTokenValidation,
    packagesController.updatePackages
  );

router.delete('/:id', adminTokenValidation, packagesController.deletePackages);


// EXPORT the router so we can import it in the server
module.exports = router;