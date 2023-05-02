import { body } from 'express-validator';
import { cleanInput } from '../../utils/string-utils';

const petInputValidator = [
    body('name').customSanitizer(cleanInput).notEmpty().withMessage('Name is required and must be non blank'),
    body('color').customSanitizer(cleanInput).notEmpty().withMessage('Color is required and must be non blank'),
    body('weight').isNumeric().withMessage('Weight must be a number').custom((value) => {
        if(value < 0 || value > 200) {
            throw new Error('Weight must be positive and lower than 200');
        }
        return true;
    }),
    body('age').isNumeric().withMessage('Age must be a number').custom((value) => {
        if(value < 0 || value > 20) {
            throw new Error('Age must be positive and lower than 20');
        }
        return true;
    })
];

export default petInputValidator;