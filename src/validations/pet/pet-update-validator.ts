import { body } from 'express-validator';

const petUpdateValidator = [
    body('available', 'Available is required').isBoolean()
];

export default petUpdateValidator;