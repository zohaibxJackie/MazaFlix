import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { Circles } from 'react-loader-spinner';
import View from "./View";

const SearchPage = () => {
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [movie, setMovie] = useState(null); // Initialize as null to indicate no search yet

    const apiNo = import.meta.env.VITE_API_NUMBER;
    const api = import.meta.env.VITE_API_KEY;

    const searchMovie = (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) {
            // Reset movie state if input is empty
            setMovie(null);
            return;
        }

        setLoading(true);
        const url = `https://www.omdbapi.com/?i=${apiNo}&apikey=${api}&t=${searchQuery}`;

        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.Response === 'True') {
                    setMovie(res);
                } else {
                    setMovie({ Response: 'False' }); // Indicate an invalid response
                }
            })
            .catch(error => {
                console.error('Something went wrong', error);
                setMovie({ Response: 'False' });
            })
            .finally(() => setLoading(false));
    };

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
                ) : movie ? (
                    movie.Response === 'True' ? (
                        <View
                        Poster={movie.Poster}
                        Title={movie.Title}
                        Genre={movie.Genre}
                        Released={movie.Released}
                        Runtime={movie.Runtime}
                        BoxOffice={movie.BoxOffice}
                        Plot={movie.Plot}
                    />
                    ) : (
                        <p>No movie found. Please try again.</p>
                    )
                ) : null /* No message before a search */
                }
            </div>
        </div>
    );
};

export default SearchPage;
