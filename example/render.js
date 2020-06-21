//Define our variables, path and fs are both a part of node and do not require a package.
const path = require("path");
const fs = require("fs");

// __dirname is a globally scoped variable that is available for use inside of a node app.
// This gives us the absolute path of a file, e.g. this is in ~/user/Homework/example/
const CURRENT_DIRECTORY_PATH = path.resolve(__dirname);

// Replace placeholder template function, this is going to find the fancy syntax that we put in our
// html, and it's going to pattern match it, and replace that with the content we want.

// It's kind of like a smarter, custom, advanced version of: $('myDiv').html(value)
// or document.getElementById("demo").innerHTML = value;
const replacePlaceholderTemplate = (templateHtml, placeholderValue, value) => {
  // RegExp is a method that is available to us that will find a pattern in a text.
  const pattern = new RegExp("{{ " + placeholderValue + " }}", "gm");

  // This takes the templateHtml, and then uses the replace method. This takes the pattern created before
  // and then replaces it with the value.
  return templateHtml.replace(pattern, value);
};

// This is going to get the html for the data we passed in.
const getSongHtml = (data) => {
  // We're using readFileSync() here because we want to run synchronously, or in a
  // blocking manner, we want this now and not off load it asynchronously.
  let songTemplate = fs.readFileSync(
    path.resolve(CURRENT_DIRECTORY_PATH, "song.html"),
    "utf8"
  );

  console.log(songTemplate);

  // Replaces the {{ value }} placeholder with our relevant data object.
  songTemplate = replacePlaceholderTemplate(
    songTemplate,
    "songName",
    data.songName // "Best of You"
  );
  songTemplate = replacePlaceholderTemplate(
    songTemplate,
    "artist",
    data.artist // "Foo Fighters"
  );

  return songTemplate;
};

//renderSong function to export that will get our data and export it.
const renderSong = (data) => {
  const songHtml = getSongHtml(data); // Get the song html for our data.

  // Gets our main indexHtml
  const indexHtml = fs.readFileSync(
    path.resolve(CURRENT_DIRECTORY_PATH, "index.html"),
    "utf8"
  );

  // Replaces the {{ song }} placeholder with the songHtml we've just modified dynamically
  return replacePlaceholderTemplate(indexHtml, "song", songHtml);
};

//Export our render function
module.exports = { renderSong };
