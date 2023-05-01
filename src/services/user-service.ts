import UserOutputDTO from "../dtos/user-output-dto";
import EntityNotFoundError from "../errors/entity-not-found-error";
import User from "../models/user";

class UserService {

    public async findById(id: string): Promise<UserOutputDTO> {
        const user = await User.findById(id);
        if(!user) {
            throw new EntityNotFoundError('User not found');
        }
        return {
            name: user.name,
            email: user.email,
            image: user.image,
            phone: user.phone
        };
    }

}

export default new UserService();