import React from "react";
import classes from "./loading.module.css";

const LoadingScreen = () => {
  return (
    <div className={`${classes.loadingScreen}`}>
      <div className={`${classes.loader}`}></div>
      <p>Загрузка...</p>
    </div>
  );
};

export default LoadingScreen;
