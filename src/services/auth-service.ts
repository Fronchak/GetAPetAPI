import bcrypt from 'bcrypt';
import UserInputDTO from "../dtos/auth/user-input-dto";
import FieldError from "../errors/field-error";
import ValidationError from "../errors/validation-error";
import User from '../models/user';
import TokenOutputDTO from '../dtos/auth/token-output-dto';
import tokenService from './token-service';
import LoginInputDTO from '../dtos/auth/login-input-dto';
import BadRequestError from '../errors/bas-request-error';


class AuthService {

    public async register(inputDTO: UserInputDTO): Promise<TokenOutputDTO> {
        if(inputDTO.password !== inputDTO.confirmPassword) {
            throw new ValidationError([
                new FieldError('password', 'Passwords must be the same'),
                new FieldError('confirmPassword', 'Passwords must be the same')
            ]);
        }

        const salt = await bcrypt.genSalt(12);
        const password = await bcrypt.hash(inputDTO.password, salt);
        const user = new User({
            name: inputDTO.name,
            email: inputDTO.email,
            phone: inputDTO.phone,
            password
        });
        await user.save();
        return tokenService.makeToken(user.email);
    }

    public async login(intputDTO: LoginInputDTO): Promise<TokenOutputDTO> {
        const user = await User.findOne({ 'email': intputDTO.email });
        if(!user) {
            throw new BadRequestError('Email or password invalid');
        }
        const match = await bcrypt.compare(intputDTO.password, user.password);
        if(!match) {
            throw new BadRequestError('Email or password invalid');
        }
        return tokenService.makeToken(user.email);
    }

}

export default new AuthService();