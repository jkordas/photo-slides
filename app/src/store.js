import fs from 'fs';
import ExifImage from 'exif';

// const path = '/Users/jkordas/IdeaProjects/photo-slides/images';//MAC
const path = '/home/jkordas/WebstormProjects/photo-slides/images';//Ubuntu
const images = [];

function readFiles(dirname, onError, callback) {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }

    let counter = 0;
    filenames.forEach((filename, index) => {
      const path = dirname + "/" + filename;

      try {
        new ExifImage({image: path}, (error, exifData) => {
          if (error) {
            console.log('Error: ' + error.message);
            //TODO: add empty photo
          }
          else {
            const orientation = exifData.image.Orientation;
            images[index] = {path, orientation};
          }
          counter++;
          if (counter === filenames.length) {
            callback(images);
          }
        });
      } catch (error) {
        console.log('Error: ' + error.message);
        counter++;
        if (counter === filenames.length) {
          callback(images);
        }
      }
    });

  });
}


export default {
  readFiles: (callback) => readFiles(path, (err) => console.log(err), callback),
  getImages: () => images
};