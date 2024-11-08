import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';

const Movieslider = ({ Data, title, showMovieDetails }) => {
    const [movieData, setMovieData] = useState([]);

    const tmdb = import.meta.env.VITE_TMDB_API_KEY;

    const TMDB_BASE_URL = 'https://api.themoviedb.org/3/search/movie?query';
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const promises = Data.map(async (e) => {
                    const response = await fetch(`${TMDB_BASE_URL}=${e.title}&api_key=${tmdb}`);
                    
                    if (!response.ok) throw new Error('Something went wrong');
                    const result = await response.json();
                    
                    return result;
                });

                const results = await Promise.all(promises);
                setMovieData(results.filter(movie => movie.results[0]));
                
            } catch (error) {
                console.error("Something went wrong :(", error);
            }
        };

        fetchMovies();
    }, [tmdb]);


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
                {
                    movieData.map((movie, index) => (
                        
                        <SwiperSlide key={index}>
                            <img
                                src={movie.results[0].poster_path ? `${IMAGE_BASE_URL}${movie.results[0].poster_path}` : 'placeholder.jpg'}
                                alt={movie.title}
                                className='poster'
                                onClick={() => showMovieDetails(movie.results[0])}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default Movieslider