import { body } from 'express-validator';
import { cleanInput } from '../../utils/string-utils';

const userInputValidator = [
    body('name').customSanitizer(cleanInput).notEmpty().withMessage('Name is required and must be non blank'),
    body('email').customSanitizer(cleanInput).notEmpty().withMessage('Email is required and must be non blank')
        .isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required and must be non blank'),
    body('confirmPassword').notEmpty().withMessage('Confirm password is required and must be non blank'),
    body('phone').customSanitizer(cleanInput).notEmpty().withMessage('Phone is required and must be non blank')
];

export default userInputValidator;