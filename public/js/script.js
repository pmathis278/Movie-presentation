let movieIds = [];
async function fetchData(query) {
    try {
      const url = `https://api.themoviedb.org/3/search/keyword?query=${query}&include_adult=false&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTJkZWU2Y2FhY2U5ODcxYzVhZDVlYmQxMGIzZjUyNSIsInN1YiI6IjY1N2JiMDhmZWEzOTQ5MDExYjNjYzI2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CGybR1tgb2IjNDkk24GxLr_EXHy0pVK-lXChsyH81Sg'
        }
      };
      const response = await fetch(url, options);
      const data = await response.json();
      movieIds = data.results.map(movie => movie.id);a
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
// Call the async function
async function fetchMovieData(movieId) {
    const apiKey = '212dee6caace9871c5ad5ebd10b3f525';
    const baseUrl = 'https://api.themoviedb.org/3/';
    const endpoint = `movie/${movieId}`;
    const queryParams = `?api_key=${apiKey}`;
    const apiUrl = baseUrl + endpoint + queryParams;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const movieData = await response.json();
      return movieData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function compileMovies(ids) {
    console.log('compileMovies')
    let compiledMovies = [];
    for(let i = 0; i < ids.length; i++){
      console.log('movieFetch')
      const movieData = await fetchMovieData(ids[i]);
      compiledMovies.push(movieData);
    }
    return compiledMovies;
  }
  async function getMovies(query){
    console.log('getMovies');
    await fetchData(query);
    let compiledMovies = await compileMovies(movieIds);
    console.log(compiledMovies);
    return compiledMovies;
  }
let searchButton = document.querySelector('#Search');
let searchInput = document.querySelector('#SearchInput');
if(searchButton){
    searchButton.addEventListener('click', async event => { // <-- make the event handler async
        event.preventDefault();
        let query = searchInput.value;
        let compiledMovies = await getMovies(query); // <-- await the Promise
        let contentDiv = document.querySelector('#Content');
        while (contentDiv.firstChild) {
            contentDiv.removeChild(contentDiv.firstChild);
        }
        compiledMovies.forEach(movie => {
            console.log(movie);
            if (movie.poster_path) {
                let movieDiv = document.createElement('div');
                movieDiv.className = 'movie';
                let img = document.createElement('img'); // create an img element
                img.className = 'movieImg';
                img.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`; // set the src to movie.poster_path
                let descDiv = document.createElement('div');
                descDiv.className = 'description';
                descDiv.textContent = movie.overview;
                let ul = document.createElement('ul');
                let watchLi = document.createElement('li');
                watchLi.className = 'icon';
                watchLi.textContent = 'Watch';
                let favLi = document.createElement('li');
                favLi.textContent = 'Favorite';
                let rateLi = document.createElement('li');
                rateLi.textContent = 'Rate';
                ul.append(watchLi, favLi, rateLi);
                movieDiv.append(img, descDiv, ul); // append the img element instead of the div
                contentDiv.append(movieDiv);
            }
        });
    })
}

