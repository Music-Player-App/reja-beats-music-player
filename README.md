# Music Search Player 

Music Search Player is a React-based web app that allows users to search for music using the iTunes API. It displays a list of songs based on the search query and allows users to preview each song using an audio player.
---
Connected Backend
This app connects to a custom backend service (Music-Player-Backend) that handles:

User authentication (JWT)

Uploading and managing user songs

Media file storage with Cloudinary

##  How It Works

- When the page loads, it shows songs by **Drake** by default.
- As the user types in the search bar, songs related to the query are automatically fetched and displayed.
- Each song result includes the track name, artist, album art, and a preview audio player.

##  Features

- Live search functionality (with debounce effect)
- Display of songs with album covers
- Audio previews for each song
- Error handling for failed requests

##  Technologies Used

- React
- CSS (custom styling)
- iTunes Search API

