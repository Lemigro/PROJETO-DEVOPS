export interface Tutor {
    id?: string;
    code?: string;
    key?: string;
    nome?: string;
    rua?: string;
    bairro?: string;
    numero?: number;
    cidade?: string;
    cep?: string;
    estado?: string;
    telefone?: string;
    cpf?: string;
    sexo?: Sexo; // Utilizando a enumeração Sexo
}

// Enumeração para o campo sexo
export enum Sexo {
    Masculino = 'Masculino',
    Feminino = 'Feminino',
    Outro = 'Outro',
}
