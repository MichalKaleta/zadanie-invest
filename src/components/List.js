import React, { useEffect, useState } from "react";
import { fetchPhotos } from "../api";
import InfiniteScroll from "react-infinite-scroll-component";

let page = 1;
const perPage = 30;
const List = () => {
  const [photos, setPhotos] = useState([]);
  //const [page, setPage] = useState(1);
  const [photoLen, setPhotoLen] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPhotos({ perPage: 30, page: 1 })
      .then((res) => {
        setPhotos(res.images);
        setPhotoLen(res.total);
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <div
      className="list-container"
      style={{ minHeight: "90vh", width: "100%" }}
    >
      {
        <div>
          <InfiniteScroll
            dataLength={photos.length}
            next={() => {
              let newPage = page + 1;
              fetchPhotos({ perPage, page: newPage })
                .then((res) => {
                  setPhotos((photos) => {
                    page = newPage;
                    return [...photos, ...res.images];
                  });
                })
                .catch((error) => setError(error));
            }}
            hasMore={perPage * (page + 1) < photoLen} // Replace with a condition based on your data source
            loader={<p>Loading...</p>}
            endMessage={<p>No more data to load.</p>}
          >
            <ul className="list-wrap">
              {photos.map(({ id, user, urls, alt_description }) => (
                <li key={id}>
                  {<img src={urls.thumb} alt={alt_description} />}
                  <p>{user.first_name + " " + user.last_name || ""}</p>
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
