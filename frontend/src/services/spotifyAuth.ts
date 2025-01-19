import { AuthConfig } from '../types/spotify';

export class SpotifyAuthService {
    private config: AuthConfig;

    constructor(config: AuthConfig) {
        this.config = config;
    }

    public getAuthUrl(): string {
        const params = new URLSearchParams({
            client_id: this.config.clientId,
            response_type: 'token',
            redirect_uri: this.config.redirectUri,
            scope: this.config.scopes.join(' '),
            show_dialog: 'true'
        });

        return `https://accounts.spotify.com/authorize?${params.toString()}`;
    }

    public parseHash(): string | null {
        if (!window.location.hash) return null;

        const params = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = params.get('access_token');
        const expiresIn = params.get('expires_in');

        if (accessToken && expiresIn) {
            const expirationTime = Date.now() + parseInt(expiresIn) * 1000;
            this.saveToken(accessToken, expirationTime);
            return accessToken;
        }

        return null;
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('spotify_access_token');
        const expiration = localStorage.getItem('spotify_token_expiration');

        if (!token || !expiration) return false;

        return Date.now() < parseInt(expiration);
    }

    public getAccessToken(): string | null {
        if (!this.isAuthenticated()) {
            return null;
        }
        return localStorage.getItem('spotify_access_token');
    }

    public logout(): void {
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_token_expiration');
    }

    private saveToken(token: string, expirationTime: number): void {
        localStorage.setItem('spotify_access_token', token);
        localStorage.setItem(
            'spotify_token_expiration',
            expirationTime.toString()
        );
    }
}
