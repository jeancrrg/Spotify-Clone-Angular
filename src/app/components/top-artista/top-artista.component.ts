import { Component, OnInit } from '@angular/core';
import { newArtista } from 'src/app/common/factories';
import { IArtista } from 'src/app/interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify-service.service';

@Component({
    selector: 'app-top-artista',
    templateUrl: './top-artista.component.html',
    styleUrls: ['./top-artista.component.scss'],
})
export class TopArtistaComponent implements OnInit {

    // Inicia com uma interface vazia declarada no factories.ts
    topArtista: IArtista = newArtista();

    constructor(private spotifyService: SpotifyService) {
    }

    ngOnInit(): void {
        this.buscarArtista();
    }

    async buscarArtista() {
        const artistas = await this.spotifyService.buscarTopArtistas(1);

        // Caso possui um artista na lista pega o primeiro
        if (!!artistas) {
            this.topArtista = artistas.pop();
        }
    }

}

