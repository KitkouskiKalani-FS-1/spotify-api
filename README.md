# Project Overview
This project is one that will allow the user to utilize a search bar in order to find artists, playlists and whole albums that most closely match their search criteria. This will be done through the use of the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) and will include both frontend and backend. The frontend is based off of a predetermined design but implemented by me within the project.

# Prerequisites
NodeJS<br/>
npm <br/>
Chrome/Firefox/Safari/Edge<br/>
MongoDB Compass<br/>


# Getting Started
Create a .env file within the api directory, fill it out DATABASE_URL with your mongodb link.<br/>
Then open 2 terminal windows and cd into the api folder in one of them and run npm start in that terminal window,<br/>
then in the other cd into spotify-react and run npm start as well.<br/>
You should see the project running on http://localhost:3000

# Links

[http://localhost:3000](http://localhost:3000) - The homepage for the application<br/>
[http://localhost:3001](http://localhost:3001) - Express Backend (No actual functionality on root route)<br/>
[http://localhost:3001/spotify/v1/login](http://localhost:3001/spotify/v1/login) - Authorizes the user using Spotify<br/>
[http://localhost:3001/spotify/v1/auth](http://localhost:3001/spotify/v1/auth) - Requests JWT from Spotify API and saves it into mongodb<br/>
[http://localhost:3001/spotify/v1/search](http://localhost:3001/spotify/v1/search) - Searches Spotify Web API for artists, playlists and albums <br/>