import { getSong } from "../services/song.api";
import { useContext } from "react";
import { SongContext } from "../Song.context";

export const useSong = ()=>{
    const context = useContext(SongContext)

    const {loading, setLoading, song, setSong} = context

    const handleGetSong = async({mood})=>{
        setLoading(true)

        try{
            const data = await getSong({mood})
            setSong(data.song)
        }
        catch(err){
            throw err.message
        }
        finally{
            setLoading(false)
        }  
    }

    return (
        {loading, song, handleGetSong}
    )
}