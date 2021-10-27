import { gql } from "@apollo/client";

export const GET_ALBUM = gql`
  query GetAlbum($id: ID!) {
    album(id: $id) {
      id
      title
      cover
      songs {
        id
        title
        src
        album {
          id
          title
          cover
        }
        artists {
          id
          name
        }
      }
    }
  }
`;

export const GET_PLAYLIST = gql`
  query GetPlaylist($id: ID!) {
    album: playlist(id: $id) {
      id
      title
      cover
      songs {
        id
        title
        src
        album {
          id
          title
          cover
        }
        artists {
          id
          name
        }
      }
    }
  }
`;

export const GET_ARTIST_DATA = gql`
  query GetArtistData($id: ID!) {
    artist(id: $id) {
      cover
      name
      songs {
        album {
          id
          title
          cover
          songs {
            title
            src
            album {
              id
              cover
              title
            }
            artists {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_LIKES = gql`
  query GetLikes($id: ID!) {
    likes(id: $id) {
      id
      title
      src
      album {
        id
        title
        cover
      }
      artists {
        id
        name
      }
    }
  }
`;

export const GET_FEATURED = gql`
  query {
    featured {
      playlists {
        id
        title
        cover
        songs {
          id
          title
          src
          album {
            id
            title
            cover
          }
          artists {
            id
            name
          }
        }
      }
      artists {
        id
        name
        cover
      }
    }
  }
`;

export const GET_FEATURED_PLAYLISTS = gql`
  query {
    featured {
      playlists {
        id
        title
        cover
        songs {
          id
          title
          src
          album {
            id
            title
            cover
          }
          artists {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_SEARCH_RESULT = gql`
  query GetSearchResult($query: String!) {
    search(query: $query) {
      albums {
        id
        title
        cover
        songs {
          id
          title
          src
          album {
            id
            title
          }
          artists {
            id
            name
          }
        }
      }
      artists {
        id
        name
        cover
      }
      songs {
        id
        src
        title
        artists {
          id
          name
        }
        album {
          id
          title
          cover
        }
      }
    }
  }
`;
