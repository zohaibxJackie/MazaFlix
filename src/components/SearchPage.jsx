import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { Circles } from 'react-loader-spinner';
import View from "./View";

const SearchPage = () => {
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);  // For handling errors

    const tmdb = import.meta.env.VITE_TMDB_API_KEY;
    const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie?query=';
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

    // Function to search for movies
    const searchMovie = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) {
            setMovie(null); // Reset movie state if input is empty
            return;
        }

        setLoading(true);
        setError(null); // Reset any previous errors

        try {
            const url = `${TMDB_BASE_URL}${searchQuery}&api_key=${tmdb}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                setMovie(data.results[0]);
            } else {
                setMovie(null); // No results found
            }
        } catch (err) {
            setError('Failed to fetch movie data. Please try again later.');
            console.error('Something went wrong');
        } finally {
            setLoading(false); // Always stop loading after the request finishes
        }
    };

    useEffect(() => {
        if (searchQuery === '') {
            setMovie(null); // Reset movie if query is cleared
        }
    }, [searchQuery]);

    return (
        <div className='search-page'>
            <div className="input-wrapper">
                <form onSubmit={searchMovie}>
                    <input
                        type="text"
                        id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search by movie name...'
                        list="movie-suggestions"
                        autoFocus
                    />
                    <datalist id="movie-suggestions">
                        {/* Example suggestions */}
                        <option value="Inception" />
                        <option value="The Matrix" />
                        <option value="The Dark Knight" />
                        <option value="Interstellar" />
                        <option value="The Godfather" />
                        <option value="Pulp Fiction" />
                        <option value="Forrest Gump" />
                        <option value="The Shawshank Redemption" />
                        <option value="Fight Club" />
                        <option value="Titanic" />
                    </datalist>
                </form>
                <span><IoSearchSharp /></span>
            </div>

            <div className="movie-wrapper">
                {loading ? (
                    <div className="loader">
                        <Circles
                            height="80"
                            width="80"
                            color="#E50914"
                            ariaLabel="circles-loading"
                            visible={true}
                        />
                    </div>
                ) : error ? (
                    <p>{error}</p>
                ) : movie ? (
                    movie.Response === 'false' ? (
                        <p>No movie found. Please try again.</p>
                    ) : (
                        <View
                            Poster={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'placeholder.jpg'}
                            Title={movie.original_title}
                            Genre={"coming soon"}
                            Released={movie.release_date}
                            Plot={movie.overview}
                        />
                    )
                ) : (
                    <p>Enter a valid movie name to search.</p> 
                )}
            </div>
        </div>
    );
};

export default SearchPage;
