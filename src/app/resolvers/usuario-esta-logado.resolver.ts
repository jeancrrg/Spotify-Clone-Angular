import { inject } from "@angular/core";
import { SpotifyService } from "../services/spotify-service.service"
import { Router } from "@angular/router";

export const usuarioEstaLogadoResolver = () => new Promise(async (res, rej) => {
    // Realiza a injeção de dependência
    const spotifyService = inject(SpotifyService);
    const router = inject(Router);

    // Retorna para a tela de login para fazer o login novamente
    const naoAutenticado = () => {
        localStorage.clear();
        router.navigateByUrl('/login');
        rej('USUÁRIO NÃO AUTENTICADO!');
        return false;
    }

    // Pega o token do usuário no localStorage
    const token = localStorage.getItem('token');

    if (!token) {
        return naoAutenticado();
    }

    // Inicia os dados do usuário e salva o token no localStorage
    const usuarioCriado = await spotifyService.inicializarUsuario();
    if (usuarioCriado) {
        res(true);
    } else {
        res(naoAutenticado);
    }

    return false;
})
