import { IMusica } from "./IMusica"

export interface IPlaylist {
    id: string,
    nome: string,
    imagemUrl: string,
    // O "?" indica que é opcional, gera apenas se quiser
    musicas?: IMusica[]
}
