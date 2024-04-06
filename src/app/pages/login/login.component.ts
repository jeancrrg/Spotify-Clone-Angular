import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    // Define o service no construtor para poder usar
    constructor(
        private spotifyService: SpotifyService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.verificarTokenUrlCallback();
    }

    verificarTokenUrlCallback() {
        const token = this.spotifyService.obterTokenUrlCallback();
        if (!!token) {
            this.spotifyService.definirAccessToken(token);
            this.router.navigate(['/player/home']);
        }
    }

    abirPaginaLogin() {
        window.location.href = this.spotifyService.obterUrlLogin();
    }

}
