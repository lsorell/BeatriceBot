# BeatriceBot
BeatriceBot is a discord bot for the Return of the Middlesticks server.
# Predictions
## Admin Commands
### Open <Option1\> <Option2\>
Opens a prediction for betting.
| Param   | Description                        |
| ------- | ---------------------------------- |
| Option1 | Name of the first betting option.  |
| Option2 | Name of the second betting option. |
#
### Close
Ends the betting period.
#
### Result <Option\>
Pays out the correct predictors and shows the leaderboard.
| Param  | Description         |
| ------ | ------------------- |
| Option | The winning option. |
#
### Cancel
Deletes the current bet and returns points to players.
### Reset
De-registers all users, reseting the entire game.

---
## General Commands
### Register
Adds the player to the game and gives them the starting point amount.
#
### Bet <Option> <Amount>
Bets a point amount on the specified option.
| Param  | Description            |
| ------ | ---------------------- |
| Option | The selected option.   |
| Amount | Amount of points bet.  |
#
### Options
Shows the betting options with info like total points bet and return ratio.
#
### Bank
Shows the player's current points.
#
### Leaderboard
Shows the current standings.

