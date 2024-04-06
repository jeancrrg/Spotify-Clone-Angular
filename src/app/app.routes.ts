import { Routes } from '@angular/router';
import { usuarioEstaLogadoResolver } from './resolvers/usuario-esta-logado.resolver';

export const AppRotas: Routes = [
    {
        path: '',
        redirectTo: 'player',
        pathMatch: 'full',
    },
    {
        path: 'player',
        // "Lazing Loading" de rotas. Carrega a rota apenas quando o usuário entrar
        loadChildren: () =>
            import('./pages/player/player.module').then(x => x.PlayerModule),
        // Irá executar o serviço antes de entrar na rota
        resolve: {
            usuarioEstaLogado: usuarioEstaLogadoResolver
        }
    },
    {
        path: 'login',
        // "Lazing Loading" de rotas. Carrega a rota apenas quando o usuário entrar
        loadChildren: () =>
            import('./pages/login/login.module').then(x => x.LoginModule)
    },
];
