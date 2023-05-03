import PetCompleteOutputDTO from "../dtos/pet/pet-complete-output-dto";
import PetInputDTO from "../dtos/pet/pet-input-dto";
import PetOutputDTO from "../dtos/pet/pet-output-dto";
import EntityNotFoundError from "../errors/entity-not-found-error";
import ForbiddenError from "../errors/forbidden-error";
import UnauthorizedError from "../errors/unauthorized-error";
import petMapper from "../mappers/pet-mapper";
import Pet from "../models/pet";
import User from "../models/user";


class PetService {

    public async save(inputDTO: PetInputDTO, username: string, images: Array<string>): Promise<PetOutputDTO> {
        const user = await User.findOne({ 'email': username });
        if(!user) {
            throw new UnauthorizedError();
        }
        const pet = new Pet({
            name: inputDTO.name,
            age: inputDTO.age,
            weight: inputDTO.weight,
            color: inputDTO.color,
            available: true,
            user,
            images
        });
        await pet.save();
        return {
            id: pet._id.toString(),
            name: pet.name,
            weight: pet.weight,
            color: pet.color,
            age: pet.age,
            images,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email
            }
        }
    }

    public async findAll(): Promise<PetOutputDTO[]> {
        const pets = await Pet.find().sort('-createdAt');
        return petMapper.convertEntitiesToDTOs(pets);
    }

    public async findByUser(username: string): Promise<PetOutputDTO[]> {
        const user = await User.findOne({ 'email': username });
        if(!user) {
            throw new EntityNotFoundError('User not found');
        }
        const pets = await Pet.find({ 'user': user._id }).sort('-createdAt');
        return petMapper.convertEntitiesToDTOs(pets);
    }

    public async findByAdopter(username: string): Promise<PetOutputDTO[]> {
        const user = await User.findOne({ 'email': username });
        if(!user) {
            throw new EntityNotFoundError('User not found');
        }
        const pets = await Pet.find({ 'adopter': user._id }).sort('-createdAt');
        return petMapper.convertEntitiesToDTOs(pets);
    }

    public async findById(id: string): Promise<PetCompleteOutputDTO> {
        const pet = await Pet.findById(id).populate('user').populate('adopter');
        if(!pet) {
            throw new EntityNotFoundError('Pet not found');
        }
        const user = pet.user as any;
        console.log('user', user);
        const adopter = pet.adopter;
        return {
            id: pet._id.toString(),
            name: pet.name,
            age: pet.age,
            weight: pet.weight,
            color: pet.color,
            images: pet.images,
            user: {
                email: user.email,
                name: user.name,
                phone: user.phone
            },
            adopter: {
                email: '',
                name: '',
                phone: ''
            }
        }
    }

    public async removePetById(id: string, username: string) {
        const pet = await Pet.findById(id);
        if(!pet) {
            throw new EntityNotFoundError('Pet not found');
        }
        const user = await User.findOne({ 'email': username });
        if(!user) {
            throw new EntityNotFoundError('User not found');
        }
        if(pet.user.toString() !== user._id.toString()) {
            throw new ForbiddenError(`You cannot delete a pet that is not yours`);
        }
        await Pet.findByIdAndDelete(id);
    }
}

export default new PetService();