import { Component, OnDestroy, OnInit } from '@angular/core';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/common/factories';
import { IMusica } from 'src/app/interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';

@Component({
    selector: 'app-player-card',
    templateUrl: './player-card.component.html',
    styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit, OnDestroy {

    musica: IMusica = newMusica();
    subs: Subscription[] = [];
    anteriorIcone = faStepBackward;
    proximoIcone = faStepForward;

    constructor(private playerService: PlayerService) {
    }

    ngOnInit(): void {
        this.obterMusicaTocando();
    }

    // Quando o componente for destruído
    ngOnDestroy(): void {
        // Se desescreve do array de inscrições
        this.subs.forEach(sub => sub.unsubscribe());
    }

    async obterMusicaTocando() {
        // Se inscreve na variável musica pois sempre que mudar a variável música atual irá mudar a variável musica
        const sub = this.playerService.musicaAtual.subscribe(musica => {
            this.musica = musica;
        })
        this.subs.push(sub);
    }

    voltarMusica() {
        this.playerService.voltarMusica();
    }

    proximaMusica() {
        this.playerService.proximaMusica();
    }

}
