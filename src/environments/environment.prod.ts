export const environment = {
    production: true
};

export const SpotifyConfiguration = {
    clientId: '1d728077ade845d78681c6d9c80bce7a',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    redirectUrl: 'http://localhost:4200/login/',
    scopes: [
        'user-read-currently-playing', // música tocando agora.
        'user-read-recently-played', // ler músicas tocadas recentemente
        'user-read-playback-state', // ler estado do player do usuário
        'user-top-read', // top artistas e músicas do usuário
        'user-modify-playback-state', // alterar do player do usuário.
        'user-library-read', // ler biblioteca dos usuários
        'playlist-read-private', // ler playlists privadas
        'playlist-read-collaborative', // ler playlists colaborativas
    ],
};
