export class SpotifyService {
    private static readonly BASE_URL = 'https://api.spotify.com/v1';
    private accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    private async fetch(endpoint: string) {
        console.log('Fetching:', `${SpotifyService.BASE_URL}${endpoint}`);
        const response = await fetch(`${SpotifyService.BASE_URL}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        });
        if (!response.ok) {
            console.error(
                'Failed to fetch data:',
                response.status,
                response.statusText
            );

            throw new Error('Failed to fetch data');
        }
        return response.json();
    }

    async getTopArtists(timeRange: string = 'medium_term', limit: number = 5) {
        return this.fetch(
            `/me/top/artists?time_range=${timeRange}&limit=${limit}`
        );
    }

    async getTopTracks(timeRange: string = 'medium_term', limit: number = 5) {
        return this.fetch(
            `/me/top/tracks?time_range=${timeRange}&limit=${limit}`
        );
    }

    async getRecentlyPlayed(limit: number = 5) {
        return this.fetch(`/me/player/recently-played?limit=${limit}`);
    }
}
