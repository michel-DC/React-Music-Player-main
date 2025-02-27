import { useContext, useReducer } from "react";
import { SongContext } from "./context/Context";
import "./App.css";
import { useQuery } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header.jsx";
import PlayingNext from "./components/PlayingNext/PlayingNext";
import Queue from "./Components/Queue/Queue";
import SongCard from "./Components/SongCard/SongCard";
import songReducer from "./context/reducer";
import { GET_QUEUED_SONGS } from "./utils/queries";

function App() {
  const initialSongState = useContext(SongContext);
  const [state, dispatch] = useReducer(songReducer, initialSongState);
  const { data } = useQuery(GET_QUEUED_SONGS);

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      <div>
        <Header />
        <div>
          <PlayingNext />
          <section className="playlist-centering">
            <div>
              <Queue queue={data?.queue} />
            </div>
          </section>
          <section className="playlist-centering">
            <h2 className="playlist-section">Toutes les musiques</h2>
            <div>
              <SongCard />
            </div>
          </section>
        </div>
        <ToastContainer />
      </div>
    </SongContext.Provider>
  );
}

export default App;
