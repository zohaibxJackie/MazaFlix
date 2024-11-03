import { Circles } from 'react-loader-spinner';
import data from '../assets/data.json';
import { useEffect, useState } from 'react';

const Random = () => {
    const [movie, setMovie] = useState(null); 
    const [loading, setLoading] = useState(true);

    const apiNo = import.meta.env.VITE_API_NUMBER; 
    const api = import.meta.env.VITE_API_KEY;

    // Function to fetch movie details
    const fetchMovie = () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomMovie = data[randomIndex].title;
        const url = `https://www.omdbapi.com/?i=${apiNo}&apikey=${api}&t=${randomMovie}`;

        setLoading(true); // Start loading

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
                console.error('Fetch error:', error);
                setMovie(null); // Set to null on error
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
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            ) : movie ? (
                <div className='cart'>
                    <img src={movie.Poster} alt="Movie Poster" />
                    <div className='cart-details'>
                        <p className="title">{movie.Title}</p>
                        <p><span>Genre:</span> {movie.Genre}</p>
                        <p><span>Released on:</span> {movie.Released}</p>
                        <p><span>Time:</span> {movie.Runtime}</p>
                        <p><span>Box Office:</span> {movie.BoxOffice}</p>
                        <p><span>Plot:</span> {movie.Plot}</p>
                        <div>
                            <button className='btn' onClick={fetchMovie}>Try One More Time</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No movie found. Please try again.</p>
            )}
        </div>
    );
};

export default Random;
