type PetOutputDTO = {
    id: string;
    name: string;
    age: number;
    weight: number;
    color: string;
    images: Array<string>;
    user?: {
        id: string;
        name: string;
        email: string;
    }
}

export default PetOutputDTO;