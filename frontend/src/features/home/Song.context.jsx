import { createContext, useState } from "react";

export const SongContext = createContext()

export const SongContextProvider =({children})=>{

    const [song, setSong] = useState({ 
        "url": "https://ik.imagekit.io/cmckywvfr/sheryians/moodifi/songs/Rab_Ne_Kiya_Faisala__DOWNLOAD_MING__L7L93UerG.mp3",
        "posterUrl": "https://ik.imagekit.io/cmckywvfr/sheryians/moodifi/posters/Rab_Ne_Kiya_Faisala__DOWNLOAD_MING__cPYm9PeLC.jpeg",
        "title": "Rab Ne Kiya Faisala [DOWNLOAD MING]",
        "mood": "sad",
    })

    const [loading, setLoading] = useState(false)


    return (
        <SongContext.Provider value={{loading, setLoading, song, setSong}}>
            {children}
        </SongContext.Provider>
    )
}