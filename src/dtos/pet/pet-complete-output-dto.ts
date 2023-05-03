import UserOutputDTO from "../user-output-dto";

type PetCompleteOutputDTO = {
    id: string;
    name: string;
    age: number;
    weight: number;
    color: string;
    images: Array<string>;
    user: UserOutputDTO;
    adopter?: UserOutputDTO;
}

export default PetCompleteOutputDTO;