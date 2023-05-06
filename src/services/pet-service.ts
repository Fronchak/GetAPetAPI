import PetCompleteOutputDTO from "../dtos/pet/pet-complete-output-dto";
import PetInputDTO from "../dtos/pet/pet-input-dto";
import PetOutputDTO from "../dtos/pet/pet-output-dto";
import PetUpdateDTO from "../dtos/pet/pet-update-dto";
import BadRequestError from "../errors/bas-request-error";
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
        const pet = await Pet.findById(id).populate(['user', 'adopter']);
        if(!pet) {
            throw new EntityNotFoundError('Pet not found');
        }
        const user = pet.user as any;
        const adopter = pet.adopter as any;
        let adopterDTO: any;
        if(adopter) {
            adopterDTO = {
                email: adopter.email,
                name: adopter.name,
                phone: adopter.phone
            };
        }
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
            adopter: adopterDTO
        }
    }

    public async removePetById(id: string, username: string) {
        const pet = await PetService.getPet(id);
        const user = await PetService.getUser(username);
        if(pet.user.toString() !== user._id.toString()) {
            throw new ForbiddenError(`You cannot delete a pet that is not yours`);
        }
        await Pet.findByIdAndDelete(id);
    }

    public async update(inputDTO: PetUpdateDTO, username: string, images: Array<string>, id: string): Promise<PetOutputDTO> {
        const user = await PetService.getUser(username);
        const pet = await PetService.getPet(id);
        if(pet.user.toString() != user._id.toString()) {
            throw new ForbiddenError('You cannot update a pet that it is not yours');
        }
        pet.name = inputDTO.name;
        pet.age = inputDTO.age;
        pet.weight = inputDTO.weight;
        pet.color = inputDTO.color;
        pet.available = inputDTO.available;
        pet.images = images;
        await pet.save()
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

    private static async getUser(username: string) {
        const user = await User.findOne({ 'email': username });
        if(!user) {
            throw new UnauthorizedError();
        }
        return user; 
    }

    private static async getPet(id: string) {
        const pet = await Pet.findById(id);
        if(!pet) {
            throw new EntityNotFoundError('Pet not found');
        }
        return pet;
    }

    public async schedule(id: string, username: string) {
        const user = await PetService.getUser(username);
        const pet = await PetService.getPet(id);
        if(pet.user.toString() == user._id.toString()) {
            throw new BadRequestError('You cannot adopt your own pet');
        }
        if(pet.adopter && pet.adopter.equals(user._id)) {
            throw new BadRequestError('You already scredule a visit to the same pet');
        }
        if(!pet.available) {
            throw new BadRequestError('This pet is not available for adoption');
        }
        pet.adopter = user._id;
        await pet.save();
    }

    public async concludedAdoption(id: string, username: string) {
        const user = await PetService.getUser(username);
        const pet = await PetService.getPet(id);
        if(user._id.toString() != pet.user._id.toString()) {
            throw new ForbiddenError('You cannot concluded a adoption to a pet that it is not yours');
        }
        if(!pet.adopter) {
            throw new BadRequestError('This pet has no adoptions schedule yet');
        }
        pet.available = false;
        await pet.save();
    }
}

export default new PetService();