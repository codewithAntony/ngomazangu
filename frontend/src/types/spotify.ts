export interface SpotifyUser {
    id: string;
    display_name: string;
    email: string;
    images: SpotifyImage[];
    product: string;
}

export interface SpotifyImage {
    url: string;
    height: number | null;
    width: number | null;
}

export interface SpotifyArtist {
    id: string;
    name: string;
    images: SpotifyImage[];
    genres: string[];
    popularity: number;
    uri: string;
}

export interface SpotifyTrack {
    id: string;
    name: string;
    album: {
        images: SpotifyImage[];
        name: string;
        release_date: string;
    };
    artists: SpotifyArtist[];
    duration_ms: number;
    popularity: number;
    uri: string;
}

export interface SpotifyPagingObject<T> {
    items: T[];
    total: number;
    limit: number;
    offset: number;
    href: string;
}

export interface RecentlyPlayedTrack {
    track: SpotifyTrack;
    played_at: string;
    context: {
        type: string;
        uri: string;
    } | null;
}

export type TimeRange = 'short_term' | 'medium_term' | 'long_term';

export interface AuthConfig {
    clientId: string;
    redirectUri: string;
    scopes: string[];
}
