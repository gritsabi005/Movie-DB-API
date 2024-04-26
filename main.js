const apiKey = '895abd009925155b6614ea78bedc7074';
const apiAccessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTVhYmQwMDk5MjUxNTViNjYxNGVhNzhiZWRjNzA3NCIsInN1YiI6IjY2MWY5ODUyN2FlY2M2MDE3YzZjZTczNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f2qWT4QLSxLTFTYWTjwvJhddsfQGOJ9X5Tk435UdKCk';
const topRatedButton = document.getElementById("topRatedButton")
const popularButton = document.getElementById("popularButton")
const searchArtistsButton = document.getElementById("searchArtistsButton")
const searchMoviesButton = document.getElementById("searchMoviesButton")
const moviesPoster = `https://image.tmdb.org/t/p/w500/`
let searchArtists = document.getElementById('searchArtistsInput')
let searchMovies = document.getElementById('searchMoviesInput')
let errormessage;

function clearRightContent() {
  document.getElementById('rightContent').innerHTML = " "
}

const optionsForTopRated = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiAccessToken}`
  }
};
topRatedButton.addEventListener('click', async () => {
  clearRightContent();
  fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, optionsForTopRated)
    .then(response => {
      if (!response.ok) { throw new Error(errormessage = 'Server returned ' + response.status + '.'); }
      return response.json();
    })
    .then(movies => {
      const resultTitle = document.createElement('h')
      resultTitle.innerText = "Top Rated"
      resultTitle.classList.add('boldIt')
      document.getElementById('rightContent').appendChild(resultTitle)
      for (const movie of movies.results.slice(0, 10)) {
        const contentDiv = document.createElement('div')
        contentDiv.classList.add('listIt')
        const aImg = document.createElement('a')
        const imgEl = document.createElement('img');
        aImg.appendChild(imgEl)
        if (movie.poster_path == null) {
          aImg.href = 'Untitled.jpg';
          imgEl.src = 'Untitled.jpg'
          imgEl.title = movie.title + ". Release date: " + movie.release_date
        } else {
          aImg.href = moviesPoster + movie.poster_path;
          imgEl.src = moviesPoster + movie.poster_path
          imgEl.title = movie.title + ". Release date: " + movie.release_date
        }
        contentDiv.appendChild(aImg);
        // this is for the paragraphs
        const sidingDiv = document.createElement('div');
        sidingDiv.classList.add('onTheSides')
        const titleP = document.createElement('p')
        sidingDiv.appendChild(titleP)
        titleP.innerText = movie.title
        titleP.classList.add('boldIt')
        const releaseDateP = document.createElement('p')
        sidingDiv.appendChild(releaseDateP)
        releaseDateP.innerText = "Release date: " + movie.release_date
        releaseDateP.classList.add('italicIt')
        contentDiv.appendChild(sidingDiv)
        // until here
        document.getElementById('rightContent').appendChild(contentDiv)
      }
      let lightbox = new SimpleLightbox('.listIt a', { /* options */ });
    })
    .catch(err => {
      const resultTitle = document.createElement('h')
      resultTitle.innerText = "NetworkError when attempting to fetch resource\nPage tips: check your connection,\nmake sure the moviedatabase website is up and running"
      resultTitle.classList.add('boldIt')
      document.getElementById('rightContent').appendChild(resultTitle)
      console.error('Response annuled, check your connection', err)
    });
})

const optionsForPopular = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiAccessToken}`
  }
};
popularButton.addEventListener('click', async () => {
  clearRightContent();
  fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, optionsForPopular)
    .then(response => {
      if (!response.ok) { throw new Error(errormessage = 'Server returned ' + response.status + '.'); }
      return response.json();
    })
    .then(movies => {
      const resultTitle = document.createElement('h')
      resultTitle.innerText = "Popular"
      resultTitle.classList.add('boldIt')
      document.getElementById('rightContent').appendChild(resultTitle)
      for (const movie of movies.results.slice(0, 10)) {
        const contentDiv = document.createElement('div')
        contentDiv.classList.add('listIt')
        const aImg = document.createElement('a')
        const imgEl = document.createElement('img');
        aImg.appendChild(imgEl)
        if (movie.poster_path == null) {
          aImg.href = 'Untitled.jpg';
          imgEl.src = 'Untitled.jpg'
          imgEl.title = movie.title + ". Release date: " + movie.release_date
        } else {
          aImg.href = moviesPoster + movie.poster_path;
          imgEl.src = moviesPoster + movie.poster_path
          imgEl.title = movie.title + ". Release date: " + movie.release_date
        }
        contentDiv.appendChild(aImg);
        const sidingDiv = document.createElement('div');
        sidingDiv.classList.add('onTheSides')
        const titleP = document.createElement('p')
        sidingDiv.appendChild(titleP)
        titleP.innerText = movie.title
        titleP.classList.add('boldIt')
        const releaseDateP = document.createElement('p')
        sidingDiv.appendChild(releaseDateP)
        releaseDateP.innerText = "Release date: " + movie.release_date
        releaseDateP.classList.add('italicIt')
        contentDiv.appendChild(sidingDiv)
        document.getElementById('rightContent').appendChild(contentDiv)
      }
      let lightbox = new SimpleLightbox('.listIt a', { /* options */ });
    })
    .catch(err => {
      const resultTitle = document.createElement('h')
      resultTitle.innerText = "NetworkError when attempting to fetch resource\nPage tips: check your connection,\nmake sure the moviedatabase website is up and running"
      resultTitle.classList.add('boldIt')
      document.getElementById('rightContent').appendChild(resultTitle)
      console.error('Response annuled, check your connection', err)
    });
})

const optionsForArtists = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiAccessToken}`
  }
};

document.getElementById('searchArtistsForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  clearRightContent();
  fetch(`https://api.themoviedb.org/3/search/person?query=${searchArtists.value}&include_adult=false&language=en-US&page=1`, optionsForArtists)
    .then(response => {
      if (!response.ok) { throw new Error(errormessage = 'Server returned ' + response.status + '.'); }
      return response.json();
    })
    .then(artists => {
      if (artists.results.length === 0) {
        console.log("error");
        alert("We do not have the artists data you are looking for in our database, make sure you spell the word right.")
      } else {
        const resultTitle = document.createElement('h')
        resultTitle.innerText = "'" + document.getElementById('searchArtistsInput').value + "'"
        resultTitle.classList.add('boldIt')
        document.getElementById('rightContent').appendChild(resultTitle)
        for (const artist of artists.results) {
          console.log(artist);
          const contentDiv = document.createElement('div')
          contentDiv.classList.add('listIt')
          const aImg = document.createElement('a')
          const imgEl = document.createElement('img');
          aImg.appendChild(imgEl)
          if (artist.profile_path == null) {
            aImg.href = 'Untitled.jpg';
            imgEl.src = 'Untitled.jpg'
            imgEl.title = artist.name + ". Known for works in: " + artist.known_for_department
          } else {
            aImg.href = moviesPoster + artist.profile_path;
            imgEl.src = moviesPoster + artist.profile_path;
            imgEl.title = artist.name + ". Known for works in: " + artist.known_for_department
          }
          contentDiv.appendChild(aImg);
          const sidingDiv = document.createElement('div');
          sidingDiv.classList.add('onTheSides')
          const nameP = document.createElement('p')
          sidingDiv.appendChild(nameP);
          nameP.innerText = artist.name
          nameP.classList.add('boldIt')
          const knownForP = document.createElement('p')
          sidingDiv.appendChild(knownForP);
          knownForP.innerText = "Works recognized for: " + artist.known_for_department
          const knownInP = document.createElement('p')
          sidingDiv.appendChild(knownInP);
          knownInP.innerText = "Known-for among others in:"
          knownInP.classList.add('italicIt')
          for (const work of artist.known_for) {
            const titleP = document.createElement('p')
            sidingDiv.appendChild(titleP);
            if (work.title == null) {
              titleP.innerText = "A " + work.media_type + " series: " + work.name
            }
            else {
              titleP.innerText = "A " + work.media_type + ": " + work.title
            }
          }
          contentDiv.appendChild(sidingDiv)
          document.getElementById('rightContent').appendChild(contentDiv)
        }
      }
      let lightbox = new SimpleLightbox('.listIt a', { /* options */ });
    })
    .catch(err => {
      const resultTitle = document.createElement('h')
      resultTitle.innerText = "NetworkError when attempting to fetch resource\nPage tips: check your connection,\nmake sure the moviedatabase website is up and running"
      resultTitle.classList.add('boldIt')
      document.getElementById('rightContent').appendChild(resultTitle)
      console.error('Response annuled, check your connection', err)
    });

})

const optionsForMovies = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiAccessToken}`
  }
};
document.getElementById('searchMoviesForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  clearRightContent();
  fetch(`https://api.themoviedb.org/3/search/movie?query=${searchMovies.value}&include_adult=false&language=en-US&page=1`, optionsForMovies)
    .then(response => {
      if (!response.ok) { throw new Error(errormessage = 'Server returned ' + response.status + '.'); }
      return response.json();
    })
    .then(movies => {
      console.log(movies.results);
      if (movies.results.length === 0) {
        console.log("error");
        alert("We do not have the movies data you are looking for in our database, make sure you spell the word right.")
      } else {
        const resultTitle = document.createElement('h')
        resultTitle.innerText = "'" + document.getElementById('searchMoviesInput').value + "'"
        resultTitle.classList.add('boldIt')
        document.getElementById('rightContent').appendChild(resultTitle)
        for (movie of movies.results) {
          console.log(moviesPoster + movie.poster_path);
          console.log(movie.title);
          console.log(movie.release_date);
          console.log(movie.overview);
          const contentDiv = document.createElement('div')
          contentDiv.classList.add('listIt')
          const aImg = document.createElement('a')
          const imgEl = document.createElement('img');
          aImg.appendChild(imgEl)
          if (movie.poster_path == null) {
            aImg.href = 'Untitled.jpg';
            imgEl.src = 'Untitled.jpg'
            imgEl.title = movie.title + ". Release date: " + movie.release_date
          } else {
            aImg.href = moviesPoster + movie.poster_path;
            imgEl.src = moviesPoster + movie.poster_path
            imgEl.title = movie.title + ". Release date: " + movie.release_date
          }
          contentDiv.appendChild(aImg);
          const sidingDiv = document.createElement('div');
          sidingDiv.classList.add('onTheSides')
          const nameP = document.createElement('p')
          sidingDiv.appendChild(nameP);
          nameP.innerText = movie.title
          nameP.classList.add('boldIt')
          const releaseDateP = document.createElement('p')
          releaseDateP.classList.add('italicIt')
          sidingDiv.appendChild(releaseDateP);
          releaseDateP.innerText = "Release date: " + movie.release_date
          const descriptionP = document.createElement('p')
          sidingDiv.appendChild(descriptionP);
          descriptionP.innerText = movie.overview
          contentDiv.appendChild(sidingDiv)
          document.getElementById('rightContent').appendChild(contentDiv)
        }
      }
      let lightbox = new SimpleLightbox('.listIt a', { /* options */ });
    })
    .catch(err => {
      const resultTitle = document.createElement('h')
      resultTitle.innerText = "NetworkError when attempting to fetch resource\nPage tips: check your connection,\nmake sure the moviedatabase website is up and running"
      resultTitle.classList.add('boldIt')
      document.getElementById('rightContent').appendChild(resultTitle)
      console.error('Response annuled, check your connection', err)
    });
})
