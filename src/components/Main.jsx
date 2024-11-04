import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import View from './View';
import data from '../assets/datafrontpage.json';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

const Main = () => {
  const [movieData, setMovieData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // State for the selected movie
  const [show, setShow] = useState(false);

  const apiNo = import.meta.env.VITE_API_NUMBER;
  const api = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const promises = data.map(async (e) => {
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

  const showMovieDetails = (movie) => {
    setSelectedMovie(movie); // Set the selected movie
    setShow(true); // Show the details
  }

  return (
    <>
      <main>
        <h1>Explore the world of movies</h1>
        <p>Search for movies you like or pick a random movie.</p>
        <div>
          <button className='btn'>
            <Link to={'/Search-For-Movies'} className="explore-btn">Explore Now</Link>
          </button>
        </div>
      </main>
      <div>
        <Swiper
          slidesPerView={1}
          // centeredSlides={true}
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
      
      {/* Backdrop so if user click on it the details will close */}
      {show && <div className='backdrop' onClick={() => setShow(false)} />}
      
      {/* Movie Details */}
      <div className='m-p-details' onClick={() => setShow(false)}>
        {
          show && selectedMovie && (
            <View
              Poster={selectedMovie.Poster}
              Title={selectedMovie.Title}
              Genre={selectedMovie.Genre}
              Released={selectedMovie.Released}
              Runtime={selectedMovie.Runtime}
              BoxOffice={selectedMovie.BoxOffice}
              Plot={selectedMovie.Plot}
            />
          )
        }
      </div>
    </>
  );
  
};

export default Main;
