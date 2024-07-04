import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'

const constantOfApiResponse = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}
const Upcoming = () => {
  const [apiResponse, setResponse] = useState(constantOfApiResponse.initial)
  const [responsedData, setData] = useState({})

  const convertCamelCase = data => ({
    page: data.page,
    results: data.results.map(eachItem => ({
      adult: eachItem.adult,
      backdropPath: eachItem.backdrop_path,
      genreIds: eachItem.genre_ids,
      id: eachItem.id,
      originalLanguage: eachItem.original_language,
      originalTitle: eachItem.original_title,
      overview: eachItem.overview,
      popularity: eachItem.popularity,
      posterPath: eachItem.poster_path,
      releaseDate: eachItem.release_date,
      title: eachItem.title,
      video: eachItem.video,
      voteAverage: eachItem.vote_average,
      voteCount: eachItem.vote_count,
    })),
    totalPages: data.total_pages,
    totalResults: data.total_results,
  })

  useEffect(() => {
    const getApiResposed = async () => {
      setResponse(constantOfApiResponse.inProgress)
      const myApiKey = 'fe5632f5a02061da51fce31afaed6c5c'
      const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${myApiKey}&language=en-US&page=1`
      const response = await fetch(url)
      const data = await response.json()
      const updateData = convertCamelCase(data)
      setData(updateData)
      setResponse(constantOfApiResponse.success)
    }
    getApiResposed()
  }, [])

  const getLoadingView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="Rings" width={150} height={150} color="blue" />
    </div>
  )

  const successView = () => (
    <div className="movie-bg-cont">
      {responsedData.results.map(eachMovie => {
        const {posterPath} = eachMovie
        return (
          <div key={eachMovie.id} className="single-movie-poster-card">
            <img
              className="movie-poster"
              alt="poster"
              src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            />
            <h4>{eachMovie.title}</h4>
            <p>{eachMovie.voteAverage}</p>
            <Link to={`/movie/${eachMovie.id}`}>
              <button className="detail-view-btn" type="button">
                View Details
              </button>
            </Link>
          </div>
        )
      })}
    </div>
  )

  const switchCases = () => {
    switch (apiResponse) {
      case constantOfApiResponse.inProgress:
        return getLoadingView()
      case constantOfApiResponse.success:
        return successView()
      default:
        return null
    }
  }

  return (
    <div>
      <Header />
      {switchCases()}
    </div>
  )
}

export default Upcoming