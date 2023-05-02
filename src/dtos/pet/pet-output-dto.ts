type PetOutputDTO = {
    id: string;
    name: string;
    age: number;
    weight: number;
    color: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
}

export default PetOutputDTO;