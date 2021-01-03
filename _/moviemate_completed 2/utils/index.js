'use strict';
const createResponse = (intent, movie) => {
  if(movie.Response === 'True') {
    let {
      Title,
      Year,
      Plot,
      Director,
      Actors,
      Poster
    } = movie;

    switch(intent) {
      case 'movieInfo' : {
        let str = `${Title} (${Year}). This film was directed by ${Director} and starred ${Actors}. ${Plot}`.substring(0,320);
        return {
          text: str,
          image: Poster
        }
      }

      case 'releaseYear' : {
        let str = `${Title} was released in ${Year}.`;
        return {
          text: str,
          image: null
        }
      }

      case 'director' : {
        let str = `${Title} (${Year}) was directed by ${Director}.`;
        return {
          text: str,
          image: null
        }
      }

      default: {
        return {
          text: "Always at your service :)",
          image: null
        }
      }
    }
  } else {
    return {
      text: "I don't seem to understand your question!",
      image: null
    }
  }
}

module.exports = createResponse;
