import { SpotifyService } from 'src/app/services/spotify-service.service';
import { Component, OnInit } from '@angular/core';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { Router } from '@angular/router';

@Component({
    selector: 'app-painel-esquerdo',
    templateUrl: './painel-esquerdo.component.html',
    styleUrls: ['./painel-esquerdo.component.scss'],
})
export class PainelEsquerdoComponent implements OnInit {

    homeIcone = faHome;
    pesquisarIcone = faSearch;
    artistaIcone = faGuitar;
    playlistIcone = faMusic;
    menuSelecionado = 'Home';
    playlists: IPlaylist[] = [];

    constructor(
        private router: Router,
        private spotifyService: SpotifyService
        ) {
    }

    ngOnInit() {
        this.buscarPlaylist();
    }

    navegarParaHome() {
        this.router.navigateByUrl('player/home');
    }

    botaoClick(botao: string) {
        this.menuSelecionado = botao;
        this.router.navigateByUrl('player/home');
    }

    irParaPlaylist(playlistId: string) {
        this.menuSelecionado = playlistId;
        this.router.navigateByUrl(`player/lista/playlist/${playlistId}`);
    }

    async buscarPlaylist() {
        this.playlists = await this.spotifyService.buscarPlaylistUsuario();
    }

}
