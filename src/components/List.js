import React, { useEffect, useState } from "react";
import { fetchPhotos } from "../api";
import InfiniteScroll from "react-infinite-scroll-component";

let page = 1;

const List = () => {
  const [photos, setPhotos] = useState([]);
  //const [page, setPage] = useState(1);
  const [photoLen, setPhotoLen] = useState(0);
  const [error, setError] = useState(null);

  const scrollFetch = (page) => {};

  useEffect(() => {
    fetchPhotos({ perPage: 30, page: 1 })
      .then((res) => {
        console.log(res);
        setPhotos(res.images);
        setPhotoLen(res.total);
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <div style={{ minHeight: "90vh", width: "100%" }}>
      {
        <div>
          <InfiniteScroll
            dataLength={30 * (page + 1)}
            next={() => {
              let newPage = page + 1;
              fetchPhotos({ perPage: 30 * newPage, page: newPage })
                .then((res) => {
                  console.log(res);
                  setPhotos(res.images);
                  page = newPage;
                })
                .catch((error) => setError(error));
            }}
            hasMore={
              true
              //    30 * (page + 1) < photoLen
            } // Replace with a condition based on your data source
            loader={<p>Loading...</p>}
            endMessage={<p>No more data to load.</p>}
          >
            <ul>
              {photos.map(({ id, urls, alt_description }) => (
                <li key={id}>
                  <img src={urls.thumb} alt={alt_description} />
                </li>
              ))}
            </ul>
          </InfiniteScroll>
          {error && <p>Error: {error.message}</p>}
        </div>
      }
    </div>
  );
};

export default List;
