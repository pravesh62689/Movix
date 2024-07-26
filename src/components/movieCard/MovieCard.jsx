import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import Img from "../lazyLoadImage/img";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;

  // Ensure vote_average is a number and handle undefined values
  const rating = typeof data.vote_average === 'number'
    ? data.vote_average.toFixed(1)
    : 'N/A'; // Fallback value if vote_average is not a number

  // Ensure release_date is defined and handle undefined values
  const releaseDate = data.release_date
    ? dayjs(data.release_date).format("MMM D, YYYY")
    : 'N/A'; // Fallback value if release_date is undefined

  return (
    <div
      className="movieCard"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock">
        <Img className="posterImg" src={posterUrl} />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating rating={rating} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </React.Fragment>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">{releaseDate}</span>
      </div>
    </div>
  );
};

export default MovieCard;
