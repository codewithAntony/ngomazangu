import {
    SpotifyUser,
    SpotifyArtist,
    SpotifyTrack,
    SpotifyPagingObject,
    RecentlyPlayedTrack,
    TimeRange
} from '../types/spotify';

export class SpotifyApiError extends Error {
    constructor(
        message: string,
        public status?: number,
        public statusText?: string
    ) {
        super(message);
        this.name = 'SpotifyApiError';
    }
}

export class SpotifyApiService {
    private readonly BASE_URL = 'https://api.spotify.com/v1';
    private accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    private async fetch<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const response = await fetch(`${this.BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                ...options.headers
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new SpotifyApiError('Token expired', 401);
            }
            throw new SpotifyApiError(
                'API request failed',
                response.status,
                response.statusText
            );
        }

        return response.json() as Promise<T>;
    }

    public async getTopArtists(
        timeRange: TimeRange = 'medium_term',
        limit: number = 10
    ): Promise<SpotifyPagingObject<SpotifyArtist>> {
        return this.fetch<SpotifyPagingObject<SpotifyArtist>>(
            `/me/top/artists?time_range=${timeRange}&limit=${limit}`
        );
    }

    public async getTopTracks(
        timeRange: TimeRange = 'medium_term',
        limit: number = 10
    ): Promise<SpotifyPagingObject<SpotifyTrack>> {
        return this.fetch<SpotifyPagingObject<SpotifyTrack>>(
            `/me/top/tracks?time_range=${timeRange}&limit=${limit}`
        );
    }

    public async getRecentlyPlayed(
        limit: number = 10
    ): Promise<SpotifyPagingObject<RecentlyPlayedTrack>> {
        return this.fetch<SpotifyPagingObject<RecentlyPlayedTrack>>(
            `/me/player/recently-played?limit=${limit}`
        );
    }

    public async getUserProfile(): Promise<SpotifyUser> {
        return this.fetch<SpotifyUser>('/me');
    }
}
