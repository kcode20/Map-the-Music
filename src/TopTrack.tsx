import React, { useEffect, useState } from "react";

import { fetchTopTracks } from "./spotifyService";

type Track = {
  name: string;
  artist: string;
  album: string;
};

const TopTracks: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const fetchedTracks = await fetchTopTracks();
      setTracks(fetchedTracks);
    };

    fetchTracks();
  }, []);

  return (
    <div>
      <h1>Top 100 Songs</h1>
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>
            <strong>{track.name}</strong> by {track.artist} - Album:
            {track.album}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopTracks;
