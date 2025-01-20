export class SpotifyService {
    private static readonly BASE_URL = 'https://api.spotify.com/v1'
    private accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken
    }

    private async fetch(endpoint: string) {
        const response = await fetch(`${SpotifyService.BASE_URL}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        })
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json()
        
    }

    async getTopArtists(limit: number = 5) {
        return this.fetch(`/me/top/artists?limit=${limit}`)
    }

    async getTopTracks(limit: number = 5) {
        return this.fetch(`/me/top/tracks?limit=${limit}`)
    }

    async getRecentlyPlayed(limit: number = 5) {
        return this.fetch(`/me/player/recently-played?limit=${limit}`)
    }
}