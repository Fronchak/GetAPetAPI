import PetInputDTO from "../dtos/pet/pet-input-dto";
import PetOutputDTO from "../dtos/pet/pet-output-dto";
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
}

export default new PetService();