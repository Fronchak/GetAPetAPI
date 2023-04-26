import { body, validationResult } from 'express-validator';
import User from '../../models/user';

const userInsertValidator = [
    body('email').custom((value, { req }) => {
        const errors = validationResult(req).array();
        const emailIsInvalid = errors.find((e) => e.param === 'email');
        if(emailIsInvalid) {
            return Promise.resolve();
        }
        return User.findOne({ 'email': value })
            .then((user) => {
                if(user) {
                    return Promise.reject('Email already register');
                }
                else {
                    return Promise.resolve();
                }
            })
    })

];

export default userInsertValidator