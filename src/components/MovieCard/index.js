import {Link} from 'react-router-dom'

import './index.css'

const MovieCard = props => {
  const {eachMovie} = props
  console.log(eachMovie)
  const {title, posterpath, voteAverage} = eachMovie

  return (
    <li key={eachMovie.id} className="single-movie-poster-card">
      <img alt={title} src={posterpath} className="movie-poster" />
      <h4>{title}</h4>
      <p>{voteAverage}</p>
      <Link to={`/movie/${eachMovie.id}`}>
        <button className="detail-view-btn" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
