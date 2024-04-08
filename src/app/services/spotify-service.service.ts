import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { SpotifyConfiguration } from 'src/environments/environment';
import { IUsuario } from '../interfaces/IUsuario';
import { SpotifyArtistaParaArtista, SpotifyArtistasTopTrackParaMusicas, SpotifyPlaylistParaPlaylist, SpotifySinglePlaylistParaPlaylist, SpotifyTrackParaMusica, SpotifyUserParaUsuario } from '../common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtista } from '../interfaces/IArtista';
import { IMusica } from '../interfaces/IMusica';

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {

    spotifyApi: Spotify.SpotifyWebApiJs = null;
    usuario: IUsuario;

    constructor(private router: Router) {
        this.spotifyApi = new Spotify();
    }

    // Inicializa o usuário logado, caso retorne verdadeiro significa que deu certo
    async inicializarUsuario() {
        // Caso o usuário já tenha sido inicializado
        if (!!this.usuario) {
            return true;
        }

        const token = localStorage.getItem('token');

        if (!token) {
            return false;
        }

        try {
            this.definirAccessToken(token);
            await this.obterSpotifyUsuario();

            // Indica que o usuário está preenchido
            return !!this.usuario;
        } catch (ex) {
            return false;
        }
    }

    // Obtém os dados do usuário do Spotify
    async obterSpotifyUsuario() {
        const userInfo = await this.spotifyApi.getMe();

        // Retorna o usuário convertido para o tipo IUsuario
        this.usuario = SpotifyUserParaUsuario(userInfo);
    }

    // Obtém as configurações do Spotify inseridas no arquvio environments
    obterUrlLogin() {
        const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
        const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
        const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
        const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
        const responseType = `response_type=token&show_dialog=true`;

        return authEndpoint + clientId + redirectUrl + scopes + responseType;
    }

    // Obtém o token de acesso do Spotify
    obterTokenUrlCallback() {
        if (!window.location.hash) {
            return '';
        }

        const params = window.location.hash.substring(1).split('&');
        return params[0].split('=')[1];
    }

    // Atribui o token recebido do Spotify na API e grava no Local Storage
    definirAccessToken(token: string) {
        this.spotifyApi.setAccessToken(token);
        localStorage.setItem('token', token);
    }

    async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]>{
        // offset e limit é definido para pegar as 50 primeiras playlist do usuário
        const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, { offset, limit });

        // Retorna as playlists convertidas para o tipo IPlaylist
        return playlists.items.map(SpotifyPlaylistParaPlaylist);
    }

    async buscarMusicasPlaylist(playlistId: string, offset = 0, limit = 50) {
        const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);

        if (!playlistSpotify) {
            return null;
        }

        const playlist = SpotifySinglePlaylistParaPlaylist(playlistSpotify);

        const listaMusicas = await this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit });
        playlist.musicas = listaMusicas.items.map(musica => SpotifyTrackParaMusica(musica.track as SpotifyApi.TrackObjectFull));

        return playlist;
    }

    async buscarMusicasArtista(idArtista: string, offset = 0, limit = 50) {
        const artista = await this.spotifyApi.getArtist(idArtista);
        const artistaConvertido = SpotifyArtistaParaArtista(artista);

        const artistaSpotify = await this.spotifyApi.getArtistTopTracks(idArtista, 'BR', { offset, limit });
        artistaConvertido.listaMusicas = SpotifyArtistasTopTrackParaMusicas(artistaSpotify);

        return artistaConvertido;
    }

    async buscarTopArtistas(limit = 10): Promise<IArtista[]> {
        const artistas = await this.spotifyApi.getMyTopArtists({ limit });

        // Retorna o usuário convertido para o tipo IArtista
        return artistas.items.map(SpotifyArtistaParaArtista);
    }

    async buscarMusicas(offset = 0, limit = 50): Promise<IMusica[]> {
        const musicas = await this.spotifyApi.getMySavedTracks({ offset, limit });

        // Retorna as músicas convertidas para o tipo IMusica
        return musicas.items.map(x => SpotifyTrackParaMusica(x.track));
    }

    async executarMusica(musicaId: string) {
        // Coloca a música na fila
        await this.spotifyApi.queue(musicaId);
        // Pula a música para executar a que foi colocada na fila
        await this.spotifyApi.skipToNext();
    }

    async obterMusicaAtual(): Promise<IMusica> {
        // Busca a música que está tocando no Spotify
        const musicaSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();

        // Retorna a música convertida para o tipo IMusica
        return SpotifyTrackParaMusica(musicaSpotify.item);
    }

    async voltarMusica() {
        await this.spotifyApi.skipToPrevious();
    }

    async proximaMusica() {
        await this.spotifyApi.skipToNext();
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }

}
