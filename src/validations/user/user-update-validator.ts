import { body, validationResult } from 'express-validator';
import User from '../../models/user';

const userUpdateValidator = [
    body('email').custom((value, { req }) => {
        const errors = validationResult(req).array();
        const emailIsInvalid = errors.find((e) => e.param === 'email');
        if(emailIsInvalid) {
            return Promise.resolve();
        }
        return User.findOne({ 'email': value })
            .then((user) => {
                const id = req.params?.id;
                if(user && user._id.toString() !== id) {
                    return Promise.reject('Email already register');
                }
                else {
                    return Promise.resolve();
                }
            })
    })

];

export default userUpdateValidator;