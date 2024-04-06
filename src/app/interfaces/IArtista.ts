import { IMusica } from "./IMusica"

export interface IArtista {
    id: string,
    nome: string,
    imagemUrl: string
    // O "?" indica que é opcional, gera apenas se quiser
    listaMusicas?: IMusica[]
}
