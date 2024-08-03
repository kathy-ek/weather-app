import { MantineProvider } from "@mantine/core";
import { CityContextProvider } from "@/contexts/CityContext";

import Searchbar from "@/components/Searchbar";
import Weather from "@/components/Weather";
import Header from "@/components/Header";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <MantineProvider
      theme={{
        colorScheme: "light",
      }}
    >
      <CityContextProvider>
        <Header />
        <main className={styles["main"]}>
          <Searchbar />
          <Weather />
        </main>
      </CityContextProvider>
    </MantineProvider>
  );
}
