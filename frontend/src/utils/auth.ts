export const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
export const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
export const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

export const SCOPES = [
    'user-top-read',
    'user-read-recently-played',
    'user-library-read'
].join(' ');
console.log('Scopes:', SCOPES);

export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=token&show_dialog=true`;

console.log('Generated login URL:', loginUrl);

export const getAccessTokenFromUrl = (): string | null => {
    console.log('Getting access token from URL');
    const hash = window.location.hash;
    if (!hash) return null;

    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split('&');
    const paramsSplitUp = paramsInUrl.reduce(
        (acc: { [key: string]: string }, currentValue) => {
            const [key, value] = currentValue.split('=');
            acc[key] = value;
            return acc;
        },
        {}
    );

    return paramsSplitUp.access_token;
};
