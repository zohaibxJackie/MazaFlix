import { Circles } from 'react-loader-spinner';
import data from '../assets/data.json';
import { useEffect, useState } from 'react';
import View from './View';

const Random = () => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const tmdb = import.meta.env.VITE_TMDB_API_KEY;
    const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie?query';
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

    const fetchMovie = async () => {
        try {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomMovie = data[randomIndex].title;

            console.log(randomMovie);

            setLoading(true);

            const url = await fetch(`${TMDB_BASE_URL}=${randomMovie}&api_key=${tmdb}`);
            const res = await url.json();
            
            if (res.results[0]) {
                setMovie(res.results[0]);
                setLoading(false);
            } else {
                setMovie({ Response: 'false' })
            }

        } catch (error) {
            console.log('the error is', error);
        }
    };

    useEffect(() => {
        fetchMovie();
    }, []);

    return (
        <div className="random-page">
            {loading ? (
                <div className='loader'>
                    <Circles
                        height="80"
                        width="80"
                        color="#E50914"
                        ariaLabel="circles-loading"
                        visible={true}
                    />
                </div>
            ) : movie ? (
                <View
                    Poster={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'placeholder.jpg'}
                    Title={movie.original_title}
                    Genre={"coming soon"}
                    Released={movie.release_date}
                    Plot={movie.overview}
                    button={fetchMovie}

                />
            ) : (
                <p>Please wait for a while or refresh the page</p>
            )}
        </div>
    );
};

export default Random;
