# PITBULL ROULETTE

This is a Rails app that delivers nonstop Pitbull in music, video, and image form. 

![Mr. Bull](/app/assets/images/pitbull.png)

# Demo

An online demo is available at https://sleepy-ocean-4068.herokuapp.com/

# Features

* Works with the YouTube API to pull a random Pitbull YouTube video into the app. Once a video loads, users can either queue up the next one or view a previous one. Another video plays automatically when one ends. 

* Works with the SoundCloud API to deliver a random Pitbull song. This feature still need improvement. The app can currently pull up one song at a time and requires the user to enter/exit the song view to select another song. 

* Works with the Giphy API to retrieve a random Pitbull gif. The Giphy API is still in beta form. This limits the complexity for image searching and retrieval. As a result, the image pool is rather shallow, and the app can return non-rapper Pitbull gifs. 

#  Installation

Clone this repo onto your desktop and run `bundle install` to retrieve the necessary gems. 

# Usage

After cloning the repo and installing the gems, you can run `rails s` to start your local server. The app can then be access at http://localhost:3000

# License

This project is licensed under the terms of the MIT license: https://github.com/IgorAntun/node-chat/blob/master/LICENSE.md

