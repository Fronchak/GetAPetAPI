import { Document, Types } from "mongoose";
import { IPet } from "../models/pet";
import PetOutputDTO from "../dtos/pet/pet-output-dto";


class PetMapper {

    public convertEntityToDTO(entity: Document<unknown, {}, IPet> & Omit<IPet & {
        _id: Types.ObjectId;
    }, never>): PetOutputDTO {
        return {
            id: entity._id.toString(),
            name: entity.name,
            age: entity.age,
            weight: entity.weight,
            color: entity.color,
            images: entity.images
        }
    }

    public convertEntitiesToDTOs(entities: (Document<unknown, {}, IPet> & Omit<IPet & {
        _id: Types.ObjectId;
    }, never>)[]): PetOutputDTO[] {
        return entities.map((entity) => this.convertEntityToDTO(entity));
    }

}

export default new PetMapper();