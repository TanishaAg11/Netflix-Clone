//constants
const apikey = "9aa0fc0e59e0181df1131639771ae436";
const apiEndpoint = "https://api.themoviedb.org/3"
const imgPath = "https://image.tmdb.org/t/p/original";  //all the cover images hosted by the api

const apiPaths = {
    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending:`${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,
    searchOnYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyC0SZJkHFX-fQ7NrsxdI4l4mGwYuY4l7P8`
}

//Boots up the app
function init(){
    // alert('your app is up');
    // fetch(apiPaths.fetchAllCategories)
    // .then(res=>res.json())
    // .then(res=>console.table(res.genres))
    // .catch(err=>console.error(err));
    fetchAndBuildAllSections();
}

function fetchAndBuildAllSections(){
    fetch(apiPaths.fetchAllCategories)
    .then(res=>res.json())            //converting response into json first
    .then(res=>{                      //res refers to response
        const categories = res.genres;
        if(Array.isArray(categories) && categories.length >0){ //to check if 'movies' is an array only
            // buildMovieSection();
            categories.slice(0,2).forEach(category=>{
                fetchAndbuildMovieSection(   //two arguments are passed into this function
                    apiPaths.fetchMoviesList(category.id),
                    category
                );
            });
        }
        // console.table(movies);
    })
    .catch(err=>console.error(err));
}

function fetchAndbuildMovieSection(fetchURL,category){
    console.log(fetchURL,category);
    fetch(fetchURL)
    .then(res=>res.json())
    .then(res=>{
        console.table(res.result)
        const movies = res.results;
        if(Array.isArray(movies) && movies.length){
            buildMoviesSection(movies, category.name);
        }
    })
    .catch(err=>console.error(err))
}

function buildMoviesSection(list, categoryName){
    console.log(list, categoryName);

    const moviesCont = document.getElementById('movies_cont');

    const moviesListHTML = list.map(item=>{
        return `
            <img class="movie_item" src="${imgPath}${item.backdrop_path}" alt="${item.title}"/>  //$--->for dynamic address
        `;
    }).join('');

    const moviesSectionHTML = `
        <h2 class="movie_section_heading">${categoryName}<span class="explore_nudge">Explore All</span></h2>
        <div class="movies_row">
           ${moviesListHTML}
        </div>
    `

    console.log(moviesListHTML);

    const div = document.createElement('div');
    div.className = "movies_section";
    div.innerHTML = moviesSectionHTML;

    // append html into movies container
    moviesCont.append(div);
}

window.addEventListener('load', function(){
    init();
})