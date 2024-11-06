import { useState } from 'react';
import { Link } from "react-router-dom";
import View from './View';
import featuringData from '../assets/datafrontpage.json';
import Movieslider from './Movieslider';
import romanticData from '../assets/romantic.json'

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
      </section>


      {/* This section is only for details when user clicks on the movie poster */}
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
