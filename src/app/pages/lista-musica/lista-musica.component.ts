import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { newMusica } from 'src/app/common/factories';
import { IMusica } from 'src/app/interfaces/IMusica';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify-service.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
    selector: 'app-lista-musica',
    templateUrl: './lista-musica.component.html',
    styleUrls: ['./lista-musica.component.scss'],
})
export class ListaMusicaComponent implements OnInit, OnDestroy {

    bannerImagemUrl = '';
    bannerTexto = '';
    musicas: IMusica[] = [];
    musicaAtual: IMusica = newMusica();
    playIcone = faPlay;
    listaSubscription: Subscription[] = [];
    title: string = '';

    constructor(
        private activedRoute: ActivatedRoute,
        private spotifyService: SpotifyService,
        private playerService: PlayerService) {
    }

    ngOnInit(): void {
        this.obterMusicas();
    }

    ngOnDestroy(): void {
        this.listaSubscription.forEach(subscription => {
            subscription.unsubscribe();
        })
    }

    obterMusicaAtual() {
        const subscription = this.playerService.musicaAtual.subscribe(musica => {
            this.musicaAtual = musica;
        });

        this.listaSubscription.push(subscription);
    }

    obterMusicas() {
        // O subscribe é usado para que ao trocar de rota que contenha parâmetros troque somente os
        // parâmetros, não sendo necessário recarregar o componente inteiro novamente
        const subscription = this.activedRoute.paramMap.subscribe(async params => {
            const tipo = params.get('tipo');
            const id = params.get('id');
            await this.obterDadosPagina(tipo, id);
        });

        this.listaSubscription.push(subscription);
    }

    async obterDadosPagina(tipo: string, id:string) {
        if (tipo === 'playlist') {
            await this.obterDadosPlaylist(id);
        } else {
            await this.obterDadosArtistas(id);
        };
    }

    async obterDadosPlaylist(playlistId: string) {
        const playlistMusicas = await this.spotifyService.buscarMusicasPlaylist(playlistId);
        this.definirDadosPagina(playlistMusicas.nome, playlistMusicas.imagemUrl, playlistMusicas.musicas);
        this.title = 'Músicas Playlist: ' + playlistMusicas.nome;
    }

    async obterDadosArtistas(artistaId: string) {

    }

    definirDadosPagina(bannerTexto: string, bannerImage: string, musicas: IMusica[]) {
        this.bannerImagemUrl = bannerImage;
        this.bannerTexto = bannerTexto;
        this.musicas = musicas;
    }

    async executarMusica(musica: IMusica) {
        await this.spotifyService.executarMusica(musica.id);
        this.playerService.definirMusicaAtual(musica);
    }

    // Retorna um array com os nomes dos artistas separados por vírgula
    obterArtistas(musica: IMusica) {
        return musica.artistas.map(artista => artista.nome).join(', ');
    }

}
