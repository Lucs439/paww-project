const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Données invalides',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  register: [
    body('email').isEmail().normalizeEmail()
      .withMessage('Email invalide'),
    body('password').isLength({ min: 8 })
      .withMessage('Le mot de passe doit contenir au moins 8 caractères')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Les mots de passe ne correspondent pas');
        }
        return true;
      }),
    body('firstName').optional().trim().isLength({ min: 1, max: 100 })
      .withMessage('Le prénom doit contenir entre 1 et 100 caractères'),
    body('lastName').optional().trim().isLength({ min: 1, max: 100 })
      .withMessage('Le nom doit contenir entre 1 et 100 caractères'),
    handleValidationErrors
  ],
  login: [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    handleValidationErrors
  ],
  testUser: [
    body('email').isEmail().normalizeEmail(),
    handleValidationErrors
  ],
  verifyEmail: [
    body('email').isEmail().normalizeEmail(),
    body('code').isLength({ min: 6, max: 6 }).isNumeric(),
    handleValidationErrors
  ]
}; 