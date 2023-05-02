import bcrypt from 'bcrypt';
import UserInputDTO from "../dtos/auth/user-input-dto";
import FieldError from "../errors/field-error";
import ValidationError from "../errors/validation-error";
import User from '../models/user';
import TokenOutputDTO from '../dtos/auth/token-output-dto';
import tokenService from './token-service';
import LoginInputDTO from '../dtos/auth/login-input-dto';
import BadRequestError from '../errors/bas-request-error';
import EntityNotFoundError from '../errors/entity-not-found-error';
import ForbiddenError from '../errors/forbidden-error';


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

    public async update(inputDTO: UserInputDTO, id: string, tokenUsername: string, image: string | undefined) {
        const userById = await User.findById(id);
        if(!userById) {
            throw new EntityNotFoundError('User not found');
        }
        const userByToken = await User.findOne({ email: tokenUsername });
        if(userById._id.toString() !== userByToken?._id?.toString()) {
            throw new ForbiddenError(`You can't update a profile that is not yours`);
        }

        if(inputDTO.password !== inputDTO.confirmPassword) {
            throw new ValidationError([
                new FieldError('password', 'Passwords must be the same'),
                new FieldError('confirmPassword', 'Passwords must be the same')
            ]);
        }
        const salt = await bcrypt.genSalt(12);
        const password = await bcrypt.hash(inputDTO.password, salt);
        console.log('id', id);
        await User.findByIdAndUpdate(id, {
            email: inputDTO.email,
            name: inputDTO.name,
            phone: inputDTO.phone,
            password
        });
        if(image) {
            await User.findByIdAndUpdate(id, { image });
        }
        else {
            console.log('Entrou no else');
            await User.findByIdAndUpdate(id, { '$unset': { 'image': '' } });
        }
    }

}

export default new AuthService();