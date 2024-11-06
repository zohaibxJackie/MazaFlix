import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';

const Genreslider = ({ genre, title, showMovieDetails }) => {
    const [movieData, setMovieData] = useState([]);

    const tmdb = import.meta.env.VITE_TMDB_API_KEY;

    const GENRE_BASE_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=';
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`${GENRE_BASE_URL}${tmdb}&with_genres=${genre}`);
                if (!response.ok) throw new Error('Something went wrong');
                const result = await response.json();

                setMovieData(result.results); // Directly set the results array
            } catch (error) {
                console.error("Something went wrong :(", error);
            }
        };

        fetchMovies();
    }, [genre]);


    const breakpoints = {
        350: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        520: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 50,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
        1200: {
            slidesPerView: 7,
            spaceBetween: 30,
        },
    };

    return (
        <div>
            <div className='category-title'>
                <p>{title}</p>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                breakpoints={breakpoints}
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="mySwiper"
            >
                {movieData.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'placeholder.jpg'}
                            alt={movie.title || movie.name} // Fallback for title or name
                            className='poster'
                            onClick={() => showMovieDetails(movie)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Genreslider