import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import SyncedLyrics from "../components/SyncedLyrics";
function App() {
    const[lyrics , setLyrics] = useState(null);
    const [artist , setArtist] = useState("tame impala");
    const [track , setTrack] = useState("dracula");
    
    async function loadLyrics() {
        const data = await invoke("fetch_lyrics" , {track : track , artist : artist});
        setLyrics(data.syncedLyrics);
    }
    /*<div className="min-h-[200px] w-full max-w-2xl rounded-xl border border-gray-700/50 bg-black/40 p-6 shadow-2xl backdrop-blur-xl">
                <p className="leading-relaxed whitespace-pre-wrap text-white">
                    {lyrics || "Lyrics will appear here..."}
                </p>
            </div>*/
    return (
        <main className="drag-area flex h-screen flex-col items-center justify-center gap-4">

            {lyrics ? (
                  <SyncedLyrics lyrics={lyrics} />
                ) : (
              <div className="w-full max-w-md space-y-4">
                <input 
                    value={track}
                    placeholder="Enter track" 
                    onChange={(e) => setTrack(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <input 
                    value={artist}
                    placeholder="Enter artist" 
                    onChange={(e) => setArtist(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button 
                    onClick={loadLyrics}
                    className="w-full transform rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-xl active:scale-95"
                >
                    Load Lyrics
                </button>
              </div>
            )}
        </main>
    );
}

export default App;
