import React from "react";
import styles from "./styles.module.scss";

const Text = ({ text, fontSize, border }) => {
  return (
    <h1 className={`${styles["text"]} ${styles[fontSize]}`}>{text}</h1>
  );
};

export default Text;
