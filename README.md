# PITBULL ROULETTE

This is a Rails app that delivers nonstop Pitbull in music, video, and image form.

![Mr. Bull](/app/assets/images/pitbull.png)

# Demo

An online demo is available at https://sleepy-ocean-4068.herokuapp.com/

# Features

* Works with the YouTube API to pull a random Pitbull YouTube video into the app. Once a video loads, users can either queue up the next or view a previous one. Another video plays automatically when one ends.

* Works with the SoundCloud API to deliver a random Pitbull song.

* Works with the Giphy API to retrieve a random Pitbull gif.

#  Installation

Clone this repo onto your desktop and run `bundle install` to retrieve the necessary gems.

  git clone https://github.com/Juxtaposeidon/pitroul.git
  bundle install

# Usage

After cloning the repo and installing the gems, you can run `rails s` to start your local server. The app can then be accessed at http://localhost:3000

# Issues

* The SoundCloud music feature does not automatically queue up the next song when the current song ends. Users need to close and reopen the music window to play the next song.

* The Giphy API is still in beta and limits request query functionality. Giphy searches also turn up non-rapper Pitbull iamges.

# License

This project is licensed under the terms of the MIT license: https://github.com/IgorAntun/node-chat/blob/master/LICENSE.md

