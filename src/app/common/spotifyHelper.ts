import { newMusica, newArtista } from 'src/app/common/factories';
import { IArtista } from 'src/app/interfaces/IArtista';
import { addMilliseconds, format } from "date-fns";
import { IMusica } from "../interfaces/IMusica";
import { IPlaylist } from "../interfaces/IPlaylist";
import { IUsuario } from "../interfaces/IUsuario";
import { newPlaylist } from "./factories";

// OBS: É feito dessa forma para retirar a dependência do Spotify e passar a usar as interfaces do projeto

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario {
    return {
        id: user.id,
        nome: user.display_name,
        // O pop pega o primeiro item do array
        imagemUrl: user.images.pop().url
    }
}

export function SpotifyPlaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
    return {
        id: playlist.id,
        nome: playlist.name,
        // O pop pega o primeiro item do array
        imagemUrl: playlist.images.pop().url
    };
}

export function SpotifySinglePlaylistParaPlaylist(playlist: SpotifyApi.SinglePlaylistResponse): IPlaylist {
    if (!playlist) {
        return newPlaylist();
    }

    return {
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: playlist.images.shift().url,
        musicas: []
    }
}

export function SpotifyArtistasTopTrackParaMusicas(artistaSpotify: SpotifyApi.ArtistsTopTracksResponse): IMusica[] {
    let listaMusicas: IMusica[] = []

    if (!artistaSpotify || artistaSpotify.tracks.length <= 0) {
        return listaMusicas;
    }

    // Converte o tempo da música de milisegundos para minutos
    const msParaMinutos = (tempoMs: number) => {
        // Pega a data 0 sem nada e adiciona o tempo em milisegundos
        const data = addMilliseconds(new Date(0), tempoMs);

        return format(data, 'mm:ss');
    }

    let listaMusicasSpotify = artistaSpotify.tracks;
    listaMusicasSpotify.forEach(musicaSpotify => {
        let musica = newMusica();
        musica.id = musicaSpotify.id,
        musica.titulo =  musicaSpotify.name,

        musicaSpotify.artists.forEach(artistaSpotify => {
            let artista = newArtista();
            artista.id = artistaSpotify.id,
            artista.nome = artistaSpotify.name,
            musica.artistas.push(artista)
        })

        musica.album = {
            id: musicaSpotify.album.id,
            nome: musicaSpotify.album.name,
            imagemUrl: musicaSpotify.album.href
        },
        musica.tempo =  msParaMinutos(musicaSpotify.duration_ms)

        listaMusicas.push(musica);
    });

    return listaMusicas;
}

export function SpotifyArtistaParaArtista(artista: SpotifyApi.ArtistObjectFull): IArtista {
    return {
        id: artista.id,
        nome: artista.name,
        // Ordena de forma decrescente pela propriedade width para pegar a imagem com maior resolução
        imagemUrl: artista.images.sort((a, b) => a.width - b.width).pop().url
    }
}

export function SpotifyTrackParaMusica(musica :SpotifyApi.TrackObjectFull): IMusica {

    // Caso não esteja tocando nenhuma música no Spotify retorna uma música vazia
    if (!musica) {
        return newMusica();
    }

    // Converte o tempo da música de milisegundos para minutos
    const msParaMinutos = (tempoMs: number) => {
        // Pega a data 0 sem nada e adiciona o tempo em milisegundos
        const data = addMilliseconds(new Date(0), tempoMs);

        return format(data, 'mm:ss');
    }

    return {
        id: musica.uri,
        titulo: musica.name,
        album: {
            id: musica.album.id,
            imagemUrl: musica.album.images.shift().url,
            nome: musica.album.name
        },
        artistas: musica.artists.map(artista => ({
            id: artista.id,
            nome: artista.name
        })),
        tempo: msParaMinutos(musica.duration_ms)
    }
}
