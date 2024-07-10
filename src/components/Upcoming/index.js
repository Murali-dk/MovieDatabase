import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import Header from '../Header'
import './index.css'

const constantOfApiResponse = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}
const Upcoming = () => {
  const [apiResponse, setResponse] = useState(constantOfApiResponse.initial)
  const [moviePage, setMoviepage] = useState(1)
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
      posterPath: `https://image.tmdb.org/t/p/w500/${eachItem.poster_path}`,
      releaseDate: eachItem.release_date,
      title: eachItem.title,
      video: eachItem.video,
      voteAverage: eachItem.vote_average,
      voteCount: eachItem.vote_count,
    })),
    totalPages: data.total_pages,
    totalResults: data.total_results,
  })

  const getApiResposed = async () => {
    setResponse(constantOfApiResponse.inProgress)
    const pagination = moviePage < 500 ? moviePage : 500
    const myApiKey = 'fe5632f5a02061da51fce31afaed6c5c'
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${myApiKey}&language=en-US&page=${pagination}`
    const response = await fetch(url)
    const data = await response.json()
    const updateData = convertCamelCase(data)
    setData(updateData)
    setResponse(constantOfApiResponse.success)
  }

  useEffect(() => {
    getApiResposed()
  }, [moviePage])

  const getLoadingView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="Rings" width={150} height={150} color="blue" />
    </div>
  )

  const successView = () => (
    <ul className="movie-bg-cont">
      {responsedData.results.map(eachMovie => (
        <MovieCard key={eachMovie.id} eachMovie={eachMovie} />
      ))}
    </ul>
  )

  const previousPage = () => {
    setMoviepage(preve => (preve > 1 ? preve - 1 : 1), getApiResposed())
  }

  const nextPage = () => {
    setMoviepage(preve => (preve < 500 ? preve + 1 : 500), getApiResposed())
  }

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
      <div className="pagination-btn-cont">
        <button onClick={previousPage} className="page-btn" type="button">
          Prev
        </button>
        <p>{moviePage}</p>
        <button onClick={nextPage} className="page-btn" type="button">
          Next
        </button>
      </div>
      {switchCases()}
    </div>
  )
}

export default Upcoming
