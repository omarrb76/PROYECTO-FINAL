export interface User {
    id: string;
    email: string;
    username: string;
    name: string;
    picture: string;
    date: Date;
    admin: boolean;
    sexo: string;
    siguiendo: string[];
    seguidores: string[];
}
