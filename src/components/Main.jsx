import { useState } from 'react';
import { Link } from "react-router-dom";
import View from './View';
import featuringData from '../assets/datafrontpage.json';
import Movieslider from './Movieslider';
import Genreslider from './Genreslider';

const Main = () => {
  const [selectedMovie, setSelectedMovie] = useState(null); // State for the selected movie
  const [show, setShow] = useState(false);

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
      {/* poster section */}
      <section className='category-wrapper'>
        <Movieslider Data={featuringData} showMovieDetails={showMovieDetails} title="Featuring" />
        {/* Every category have a genre number in TMDB api */}
        <Genreslider showMovieDetails={showMovieDetails} title="Crime" genre={80} />
        <Genreslider showMovieDetails={showMovieDetails} title="Documentary" genre={99} />
        <Genreslider showMovieDetails={showMovieDetails} title="Drama" genre={18} />
        <Genreslider showMovieDetails={showMovieDetails} title="Family" genre={10751} />
        <Genreslider showMovieDetails={showMovieDetails} title="Fantasy" genre={14} />
        <Genreslider showMovieDetails={showMovieDetails} title="History" genre={36} />
        <Genreslider showMovieDetails={showMovieDetails} title="Horror" genre={27} />
        <Genreslider showMovieDetails={showMovieDetails} title="Music" genre={10402} />
        <Genreslider showMovieDetails={showMovieDetails} title="Mystery" genre={9648} />
        <Genreslider showMovieDetails={showMovieDetails} title="18+" genre={10749} />
        <Genreslider showMovieDetails={showMovieDetails} title="Science Fiction" genre={878} />
        <Genreslider showMovieDetails={showMovieDetails} title="TV Movie" genre={10770} />
        <Genreslider showMovieDetails={showMovieDetails} title="Thriller" genre={53} />
        <Genreslider showMovieDetails={showMovieDetails} title="War" genre={10752} />
        <Genreslider showMovieDetails={showMovieDetails} title="Western" genre={37} />
      </section>


      {/* This section is only for details when user clicks on the movie poster */}
      {/* Backdrop so if user click on it the details will close */}
      {show && <div className='backdrop' onClick={() => setShow(false)} />}

      {/* Movie Details */}
      <div className='m-p-details' onClick={() => setShow(false)}>
        {
          show && selectedMovie && (
            <View
              Poster={selectedMovie.poster_path}
              Title={selectedMovie.title}
              Genre={'This feature will come soon'}
              Released={selectedMovie.release_date}
              BoxOffice={selectedMovie.BoxOffice}
              Plot={selectedMovie.overview}
            />
          )
        }
      </div>
    </>
  );

};

export default Main;
