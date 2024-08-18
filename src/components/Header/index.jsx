import React from "react";
import moment from "moment";
import Image from "next/image";

import Text from "../Text";

import Github from "@/assets/icons/github.svg";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles["header"]}>
      <Text
        text="Get the latest on today's weather"
        fontSize="large"
      />
      <div className={styles["right-header"]}>
        <Text
          text={moment().format("MMMM Do YYYY, h:mm:ss a")}
          fontSize="small"
        />
        <a href="https://github.com/kathy-ek" target="_blank" className={styles["github"]}>
          <Image src={Github} />
        </a>
      </div>
    </header>
  );
};

export default Header;
