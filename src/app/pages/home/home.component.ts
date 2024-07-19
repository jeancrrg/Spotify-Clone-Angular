import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/common/factories';
import { IMusica } from 'src/app/interfaces/IMusica';
import { PlayerService } from 'src/app/services/player-service.service';
import { SpotifyService } from 'src/app/services/spotify-service.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

    playIcone = faPlay
    musicas: IMusica[] = [];
    musicaAtual: IMusica = newMusica();

    // Array de inscrição
    subs: Subscription[] = [];

    constructor(
        private spotifyService: SpotifyService,
        private playerService: PlayerService
        ) {
    }

    ngOnInit(): void {
        this.obterMusicas();
        this.obterMusicaAtual();
    }

    // Método realizado quando o componente for destruído
    ngOnDestroy(): void {
        // Se desescreve de todas as incrições que foram realizadas
        this.subs.forEach(sub => sub.unsubscribe);
    }

    async obterMusicas() {
        this.musicas = await this.spotifyService.buscarMusicas();
    }

    obterMusicaAtual() {
        // Se inscreve na música atual do service, onde ao mudar a música o Angular fala para todo mundo que mudou
        // OBS: Toda vez que realizar o subscribe em algum momento deve se desescrever
        const sub = this.playerService.musicaAtual.subscribe(musica => {
            this.musicaAtual = musica;
        });

        // Pega a variável de inscrição e coloca dentro de um array de inscrição
        this.subs.push(sub);
    }

    // Retorna um array com os nomes dos artistas separados por vírgula
    obterArtistas(musica: IMusica) {
        return musica.artistas.map(artista => artista.nome).join(', ');
    }

    async executarMusica(musica: IMusica) {
        await this.spotifyService.executarMusica(musica.id);
        this.playerService.definirMusicaAtual(musica);
    }

}
