import { Injectable } from '@angular/core';
import { IMusica } from '../interfaces/IMusica';
import { BehaviorSubject } from 'rxjs';
import { newMusica } from '../common/factories';
import { SpotifyService } from './spotify-service.service';

@Injectable({
    providedIn: 'root',
})
export class PlayerService {

    // É um objeto onde qualquer alteração ele escuta e realiza essa alteração. já inicia vazio
    musicaAtual = new BehaviorSubject<IMusica>(newMusica());

    // Timer para verificar se a música que está tocando é a mesma que está tocando no Spotify
    timerId: any = null;

    constructor(private spotifyService: SpotifyService) {
        // Quando o componente for construído obtem a música atual
        this.obterMusicaAtual();
    }

    async obterMusicaAtual() {
        // Limpa o timer
        clearTimeout(this.timerId);

        const musica = await this.spotifyService.obterMusicaAtual();
        this.definirMusicaAtual(musica);

        // A cada 3s verifica se a música atual é a mesma que está tocando no Spotify
        // OBS: É feito dessa forma pois a API do Spotify não permite pendurar e ficar escutando a variável música toda hora que troca de música
        this.timerId = setInterval(async () => {
            await this.obterMusicaAtual();
        }, 5000);
    }

    definirMusicaAtual(musica: IMusica) {
        // Publica esse valor pra todo mundo que está escutando a variável musicaAtual
        this.musicaAtual.next(musica);
    }

    async voltarMusica() {
        await this.spotifyService.voltarMusica();
    }

    async pausarMusica() {
        await this.spotifyService.pausarMusica();
    }

    async despausarMusica() {
        await this.spotifyService.despausarMusica();
    }

    async pularMusica() {
        await this.spotifyService.pularMusica();
    }

}
