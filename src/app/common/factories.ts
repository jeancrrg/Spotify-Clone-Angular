import { IMusica } from '../interfaces/IMusica';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IArtista } from './../interfaces/IArtista';

// Gera uma interface vazia para poder ser inicializada

export function newArtista(): IArtista {
    return {
        id: '',
        nome: '',
        imagemUrl: '',
        listaMusicas: []
    };
}

export function newMusica(): IMusica {
    return {
        id: '',
        titulo: '',
        artistas: [],
        album: {
            id: '',
            nome: '',
            imagemUrl: ''
        },
        tempo: ''
    }
}

export function newPlaylist(): IPlaylist {
    return {
        id: '',
        imagemUrl: '',
        nome: '',
        musicas: []
    }
}
