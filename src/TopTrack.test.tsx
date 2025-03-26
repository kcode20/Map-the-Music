import { act, render, screen, waitFor } from "@testing-library/react";

import TopTracks from "./TopTrack";
import { fetchTopTracks } from "./spotifyService";

jest.mock("./spotifyService");

const mockTracks = [
  { name: "Track 1", artist: "Artist 1", album: "Album 1" },
  { name: "Track 2", artist: "Artist 2", album: "Album 2" },
];

describe("TopTracks Component", () => {
  beforeEach(async () => {
    (fetchTopTracks as jest.Mock).mockResolvedValueOnce(mockTracks);
    await act(async () => {
      render(<TopTracks />);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the heading", async () => {
    expect(screen.getByText("Top 100 Songs")).toBeInTheDocument();
  });

  it("fetches and displays tracks", async () => {
    await waitFor(() => {
      expect(screen.getByText(/Track 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Artist 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Album 1/i)).toBeInTheDocument();

      expect(screen.getByText(/Track 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Artist 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Album 2/i)).toBeInTheDocument();
    });

    expect(fetchTopTracks).toHaveBeenCalledTimes(1);
  });
});
