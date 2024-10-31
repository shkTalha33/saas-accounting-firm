import React, { useEffect, useState } from "react";
// import './ImageWithLoader.css'; // Import your CSS file for styling
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ImageLoader = ({ imageUrl, classes, circeltrue = false, onClick }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoading(false);
  }, [imageUrl]);

  return (
    <div className={classes}>
      {loading ? (
        <>
          <Skeleton circle={circeltrue} className="skelton_main" />
        </>
      ) : (
        <img
          src={imageUrl}
          alt={""}
          loading="lazy"
          className={classes}
          onClick={onClick && (() => onClick())}
        />
      )}
    </div>
  );
};

export default ImageLoader;
