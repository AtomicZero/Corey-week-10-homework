const fs = require("fs");
const { renderSong } = require("./render"); //Import our render function

//Define a mock data object for us to render.
const currentSong = {
  songName: "Best of You",
  artist: "Foo Fighters",
};

//Pass this current song object through to our html templating engine/
const htmlOutput = renderSong(currentSong);

fs.writeFileSync("output.html", htmlOutput);
