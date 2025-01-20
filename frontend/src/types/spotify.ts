interface SpotifyArtist {
    id: string;
    name:string;
    images: { url: string; height: number; width: number }[];
}

interface SpotifyTrack {
    id: string;
    name: string;
    artists: SpotifyArtist[]
    album: {
        images: { url: string; height: number; width: number }[]
    };
}

