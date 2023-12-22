const apiKey = '212dee6caace9871c5ad5ebd10b3f525';
const baseUrl = 'https://api.themoviedb.org/3/';

// Example: Get details of a movie by ID (movie ID=550 is for the movie 'Fight Club')
const movieId = 550;
const endpoint = `movie/${movieId}`;
const queryParams = `?api_key=${apiKey}`;

// Construct the URL
const apiUrl = baseUrl + endpoint + queryParams;

// Make the request using the Fetch API with async/await
async function fetchData() {
  try {
    const response = await fetch(apiUrl);

    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const movieData = await response.json();
    
    
    console.log(movieData);
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
  }
}

// Call the async function
fetchData();
