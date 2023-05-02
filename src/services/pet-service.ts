import PetInputDTO from "../dtos/pet/pet-input-dto";
import PetOutputDTO from "../dtos/pet/pet-output-dto";
import UnauthorizedError from "../errors/unauthorized-error";
import Pet from "../models/pet";
import User from "../models/user";


class PetService {

    public async save(inputDTO: PetInputDTO, username: string): Promise<PetOutputDTO> {
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
            user
        });
        await pet.save();
        return {
            id: pet._id.toString(),
            name: pet.name,
            weight: pet.weight,
            color: pet.color,
            age: pet.age,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email
            }
        }
    }

}

export default new PetService();