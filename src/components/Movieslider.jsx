import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';

const Movieslider = ({ Data, title, showMovieDetails }) => {
    const [movieData, setMovieData] = useState([]);

    const apiNo = import.meta.env.VITE_API_NUMBER;
    const api = import.meta.env.VITE_API_KEY;    
    
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const promises = Data.map(async (e) => {
                    const response = await fetch(`https://www.omdbapi.com/?i=${apiNo}&apikey=${api}&t=${e.title}`);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const result = await response.json();
                    return result;
                });

                const results = await Promise.all(promises);
                setMovieData(results.filter(movie => movie.Response !== "False" && movie.Poster && movie.Poster !== "N/A"));
            } catch (error) {
                console.error("Error fetching movie data:", error);
            }
        };

        fetchMovies();
    }, [api, apiNo]);


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
                                src={movie.Poster}
                                alt={movie.Title}
                                className='poster'
                                onClick={() => showMovieDetails(movie)}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default Movieslider