# README

<!-- TABLE OF CONTENTS -->

## Introduction
Our project began from the keyword online shopping, which has various merits like lower price, more products and so on.
But it's still quite tedious, boring, and hard to get an intuitive understanding on price.
So, we wanted to create an intuitive and fun quiz game where the users have to guess the price of Asos products.
Show me the money.


## Technologies
+ React
+ Npm
+ Jsx

## High-level components
The most important components are [GTPGame](https://github.com/sopra-fs23-group-41/Client/blob/main/src/components/views/GTPGame.js), [HigherOrLowerGame](https://github.com/sopra-fs23-group-41/Client/blob/main/src/components/views/HigherOrLowerGame.js) and [MostExpensiveItem](https://github.com/sopra-fs23-group-41/Client/blob/main/src/components/views/MostExpensiveItem.js), since there the game logic of the different game modes are implemented.
[EndOfGame](https://github.com/sopra-fs23-group-41/Client/blob/main/src/components/views/EndOfGame.js) is also essential, because there the final ranking of the game are displayed.

## Launch & Deployment
Start the client by running the following command in the terminal:
    ```
    npm run dev
    ```

## Illustrations
Illustrations for the Mix It Up game mode:
<h3 align="center">
  <br>
  <a href="https://github.com/sopra-fs23-group-41"><img src="/src/components/pictures/Landing.png" alt="Landing"></a>
  <br>
  Landing - Main menu of the app.
  <br>
</h3>
<h3 align="center">
  <br>
  <a href="https://github.com/sopra-fs23-group-41"><img src="/src/components/pictures/Settings.png" alt="Settings"></a>
  <br>
  Settings - Select settings of the game you want to play.
  <br>
</h3>
<h3 align="center">
  <br>
  <a href="https://github.com/sopra-fs23-group-41"><img src="/src/components/pictures/Lobby.png" alt="Lobby"></a>
  <br>
  Lobby - In the lobby you can see the players, settings & pincode to join.
  <br>
</h3>
<h3 align="center">
  <br>
  <a href="https://github.com/sopra-fs23-group-41"><img src="/src/components/pictures/GTP.png" alt="GTP"></a>
  <br>
  Guess The Price - Guess the correct price for the provided article.
  <br>
</h3>
<h3 align="center">
  <br>
  <a href="https://github.com/sopra-fs23-group-41"><img src="/src/components/pictures/Leaderboard.png" alt="Leaderboard"></a>
  <br>
  Leaderboard - Current ranking according to points gained.
  <br>
</h3>
<h3 align="center">
  <br>
  <a href="https://github.com/sopra-fs23-group-41"><img src="/src/components/pictures/MEI.png" alt="MEI"></a>
  <br>
  Most Expensive Item - Guess which of the four articles is the most expensive. 
  <br>
</h3>
<h3 align="center">
  <br>
  <a href="https://github.com/sopra-fs23-group-41"><img src="/src/components/pictures/HoL.png" alt="HoL"></a>
  <br>
  Higher or Lower - Guess if the price of the article on the right is higher or lower to the one to the left.
  <br>
</h3>
<h3 align="center">
  <br>
  <a href="https://github.com/sopra-fs23-group-41"><img src="/src/components/pictures/EOG.png" alt="EOG"></a>
  <br>
  End of the Game - Final rankings of the game with the winner highlighted.
  <br>
</h3>

## Roadmap
+ Version of Guess The Price, where players have to type in a price
+ Stronger authentication
+ Top-notch synchronization (WebSockets)
+ Multiplayer all-time leaderboard, based on points snatched during games
+ Friends feature
+ Permanently store registered users

## Authors and acknowledgment
+ Eunji Lee ([@EunjiLee-dev](https://github.com/EunjiLee-dev)): Front-end
+ Laurent Le Febve ([@LaurentLeFebve](https://github.com/LaurentLeFebve)): Front-end
+ Tiago Ferreiro Matos ([@tyagos](https://github.com/tyagos)): Front-end
+ Timo Tietje ([@TimoTietje](https://github.com/TimoTietje)): Back-end
+ Yuqing Huang ([@DarleneQing](https://github.com/DarleneQing)): Back-end

  and special thanks to our personal TA: Dennys Huber ([@devnnys](https://github.com/devnnys))

## License
[Apache License 2.0](LICENSE)
