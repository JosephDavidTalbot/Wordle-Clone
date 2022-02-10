# Wordle-Clone

A clone of Wordle, using React and Typescript for the front-end, and Python for the back-end.

At the time of writing, the question of what the backend would even be is somewhat of an open one. My current best guess is a leaderboard of sorts. Storing the secret word client-side is less secure than server-side, of course, but considering that this is for a silly three-minute game that, ideally, would be played by a lot of people, optimizing for performance over security is a tradeoff I deem acceptable.

## TODO:

### Front End
1. Basic Mastermind mechanics- submit a guess, check it against secret code, and return the number and type of correct characters.
2. User Interface. Display history of guesses and valid letters in a user-readable way. Colorblind mode on by default, and color-coding legend always visible on the side while on desktop.
3. Backend integration. Allow users to, upon completion, submit their game to the leaderboard along with their name. Implement checks to prevent users from inputting racial slurs, but not profanity in general, because leaderboards full of four-letter words are always funny. Also, get new secret words from the server.

### Back End
1. Figure out how, exactly, to use a Python backend with a React front-end.
2. SQLite integration- pipe user records into the leaderboard, and return the leaderboard for convenient viewing.
3. Give frontend new secret words.
