import { Circles } from 'react-loader-spinner';
import data from '../assets/data.json';
import { useEffect, useState } from 'react';
import View from './View';

const Random = () => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const apiNo = import.meta.env.VITE_API_NUMBER;
    const api = import.meta.env.VITE_API_KEY;

    const fetchMovie = () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomMovie = data[randomIndex].title;
        const url = `https://www.omdbapi.com/?i=${apiNo}&apikey=${api}&t=${randomMovie}`;

        setLoading(true);

        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.Response === "True") {
                    setMovie(res);
                } else {
                    setMovie(null);
                }
            })
            .catch(error => {
                // console.error('Fetch error:', error);
                setMovie(null);
            })
            .finally(() => setLoading(false));
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
                    Poster={movie.Poster}
                    Title={movie.Title}
                    Genre={movie.Genre}
                    Released={movie.Released}
                    Runtime={movie.Runtime}
                    BoxOffice={movie.BoxOffice}
                    Plot={movie.Plot}
                    button={fetchMovie}
                />
            ) : (
                <p>Please wait for a while or refresh the page</p>
            )}
        </div>
    );
};

export default Random;
