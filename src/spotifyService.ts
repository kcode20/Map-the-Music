export const getAccessToken = async () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET!;
  const authString = btoa(`${clientId}:${clientSecret}`);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authString}`,
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();

  if (data.error) {
    console.error(
      `Spotify API Error: ${data.error.message} (Status: ${data.error.status})`
    );
    throw new Error(`Error fetching access token: ${data.error.message}`);
  }

  return data.access_token;
};

export const fetchTopTracks = async () => {
  const accessToken = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/playlists/0sDahzOkMWOmLXfTMf2N4N/tracks", // Top 100 - Global playlist
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();
  if (data.error) {
    console.error(
      `Spotify API Error: ${data.error.message} (Status: ${data.error.status})`
    );
    throw new Error(`Spotify API Error: ${data.error.message}`);
  }

  return data.items.map((item: any) => ({
    name: item.track.name,
    artist: item.track.artists.map((artist: any) => artist.name).join(", "),
    album: item.track.album.name,
  }));
};
