import { useState, useEffect } from "react";

const View = ({ Poster, Title, Genre, Released, BoxOffice, Plot, button, id }) => {
    const [video, setVideo] = useState('');
    const [videoError, setVideoError] = useState(false);
    const [showPoster, setShowPoster] = useState(false); // Explicitly toggle poster display

    const tmdb = import.meta.env.VITE_TMDB_API_KEY;
    const VIDEO_URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${tmdb}&language=en-US`;
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(VIDEO_URL);
                if (!response.ok) throw new Error('Something went wrong');
                const result = await response.json();
                if (result.results && result.results.length > 0) {
                    setVideo(result.results[0].key);
                    setVideoError(false);
                } else {
                    setVideoError(true);
                }
            } catch (error) {
                console.error("Something went wrong :(");
                setVideoError(true);
            }
        };

        fetchMovies();
    }, [id]);

    const togglePoster = () => {
        setShowPoster((prev) => !prev); // Toggle the display of the poster or video
    };

    return (
        <div className='cart'>
            {/* Show poster if showPoster is true, or if videoError occurs, otherwise show video */}
            {showPoster || videoError ? (
                Poster ? (
                    <img src={`${IMAGE_BASE_URL}${Poster}`} alt="Movie Poster" />
                ) : (
                    <p>Poster not available for this movie.</p>
                )
            ) : (
                <iframe
                    src={`https://www.youtube.com/embed/${video}`}
                    title="Movie Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onError={() => setVideoError(true)}
                ></iframe>
            )}
            
            <div className='cart-details'>
                {Title && <p className="title">{Title}</p>}
                {Genre && <p><span>Genre:</span> {Genre}</p>}
                {Released && <p><span>Released on:</span> {Released}</p>}
                {BoxOffice && <p><span>Box Office:</span> {BoxOffice}</p>}
                {Plot && <p><span>Plot:</span> {Plot}</p>}
                <div className="btn-section">
                    {button && (
                        <div>
                            <button className='btn' onClick={button}>Try One More Time</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default View;
