const View = ({ Poster, Title, Genre, Released, Runtime, BoxOffice, Plot, button }) => {
    return (
        <div className='cart'>
            {Poster && <img src={Poster} alt="Movie Poster" />}
            <div className='cart-details'>
                {Title && <p className="title">{Title}</p>}
                {Genre && <p><span>Genre:</span> {Genre}</p>}
                {Released && <p><span>Released on:</span> {Released}</p>}
                {Runtime && <p><span>Time:</span> {Runtime}</p>}
                {BoxOffice && <p><span>Box Office:</span> {BoxOffice}</p>}
                {Plot && <p><span>Plot:</span> {Plot}</p>}
                {button && (
                    <div>
                        <button className='btn' onClick={button}>Try One More Time</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default View;
