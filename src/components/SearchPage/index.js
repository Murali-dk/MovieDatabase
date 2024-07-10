import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'

const constantOfApiResponse = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

const SearchPage = props => {
  const {match} = props
  const {params} = match
  const {userQuery} = params

  const [apiData, setData] = useState({})
  const [apiResponse, setResponse] = useState(constantOfApiResponse.initial)

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
      posterpath: eachItem.poster_path,
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
    setResponse(constantOfApiResponse.inProgress)
    const getSearchedResult = async () => {
      const apiKey = 'fe5632f5a02061da51fce31afaed6c5c'
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${userQuery}&page=1`
      const response = await fetch(url)
      const data = await response.json()
      const updatedData = convertCamelCase(data)
      setData(updatedData)
      setResponse(constantOfApiResponse.success)
    }
    getSearchedResult()
  }, [userQuery])

  const loadingView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="Rings" width={150} height={150} color="blue" />
    </div>
  )

  const successView = () => (
    <div className="movie-bg-cont">
      {apiData.results.map(eachMovie => (
        <div key={eachMovie.id} className="single-movie-poster-card">
          <img
            className="movie-poster"
            alt="poster"
            src={`https://image.tmdb.org/t/p/w500/${eachMovie.posterpath}`}
          />
          <h4>{eachMovie.title}</h4>
          <p>{eachMovie.voteAverage}</p>
          <Link to={`/movie/${eachMovie.id}`}>
            <button className="detail-view-btn" type="button">
              View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  )

  const swithResponse = () => {
    switch (apiResponse) {
      case constantOfApiResponse.inProgress:
        return loadingView()
      case constantOfApiResponse.success:
        return successView()
      default:
        return null
    }
  }

  return (
    <div>
      <Header />
      {swithResponse()}
    </div>
  )
}

export default SearchPage
