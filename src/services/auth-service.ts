import bcrypt from 'bcrypt';
import UserInputDTO from "../dtos/auth/user-input-dto";
import FieldError from "../errors/field-error";
import ValidationError from "../errors/validation-error";
import User from '../models/user';


class AuthService {

    public async register(inputDTO: UserInputDTO) {
        if(inputDTO.password !== inputDTO.confirmPassword) {
            throw new ValidationError([
                new FieldError('password', 'Passwords must be the same'),
                new FieldError('confirmPassword', 'Passwords must be the same')
            ]);
        }

        const password = await bcrypt.hash(inputDTO.password, 10);
        const user = new User({
            name: inputDTO.name,
            email: inputDTO.email,
            phone: inputDTO.phone,
            password
        });
        await user.save();
    }

}

export default new AuthService();