import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'

const constantOfApiResponse = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

const SingleMoviePage = props => {
  const {match} = props
  const [apiResponse, setResponse] = useState(constantOfApiResponse.initial)
  const [castData, setCastdata] = useState({})
  const [apiData, setData] = useState({})

  const convertCamelCase = data => ({
    backdropPath: data.backdrop_path,
    genres: data.genres,
    id: data.id,
    title: data.title,
    overview: data.overview,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
    tagline: data.tagline,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
    duration: data.runtime,
  })

  const convertinCastData = data => ({
    id: data.id,
    cast: data.cast.map(a => ({
      castId: a.cast_id,
      character: a.character,
      creditId: a.credit_id,
      gender: a.gender,
      id: a.id,
      knownForDepartment: a.known_for_department,
      name: a.name,
      order: a.order,
      originalName: a.original_name,
      popularity: a.popularity,
      profilePath: a.profile_path,
    })),
  })

  useEffect(() => {
    const {params} = match
    const {movieId} = params
    setResponse(constantOfApiResponse.inProgress)
    const getSinglePageMovie = async () => {
      const apiKey = 'fe5632f5a02061da51fce31afaed6c5c'
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      const upadateData = convertCamelCase(data)
      console.log(upadateData)
      setData(upadateData)
    }

    const getCastResponse = async () => {
      const apiKey = 'fe5632f5a02061da51fce31afaed6c5c'
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
      const response = await fetch(url)
      const data = await response.json()
      const updatedData = convertinCastData(data)
      console.log(updatedData)
      setCastdata(updatedData)
      setResponse(constantOfApiResponse.success)
    }
    getSinglePageMovie()
    getCastResponse()
  }, [match])

  const loadingView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="Rings" width={150} height={150} color="blue" />
    </div>
  )

  const successView = () => {
    const {cast} = castData
    console.log(cast)
    return (
      <div className="movie-bg-cont">
        <div className="container">
          <img
            className="img"
            alt="murali"
            src={`https://image.tmdb.org/t/p/w500/${apiData.posterPath}`}
          />
          <div>
            <h1>{apiData.title}</h1>
            <p>{apiData.duration}</p>
            <p>{apiData.releaseDate}</p>
            <p>{apiData.overview}</p>
          </div>
        </div>
        <div className="cast-container">
          <ul className="cast-card">
            {cast.map(eachItem => (
              <li key={eachItem.id}>
                <img
                  className="cast-img"
                  alt="img"
                  src={`https://image.tmdb.org/t/p/w500${eachItem.profilePath}`}
                />
                <h2>{eachItem.originalName}</h2>
                <p>{eachItem.character}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  const switchcase = () => {
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
      {switchcase()}
    </div>
  )
}

export default SingleMoviePage
