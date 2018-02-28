import fs from 'fs';
const path = '/Users/jkordas/IdeaProjects/photo-slides/images';
const images = [];

function readFiles(dirname, onError, callback) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      images.push(dirname + "/" + filename);
    });

    callback(images);
  });
}


export default {
  readFiles: (callback) => readFiles(path, (err) => console.log(err), callback),
  getImages: () => images
};