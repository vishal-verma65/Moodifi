const songModel = require("../models/song.model")
const id3 = require("node-id3")
const storageService = require("../services/storage.service")

const uploadSong = async(req, res)=>{

    const {mood} = req.body
    const songBuffer = req.file.buffer
    const tags = id3.read(songBuffer)
    const imageBuffer = tags.image?.imageBuffer 

    if (!imageBuffer) {
        return res.status(400).json({ message: "Song has no embedded cover art" })
    }

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            folder: "sheryians/moodifi/songs"
        }),
        storageService.uploadFile({
            buffer: imageBuffer,
            filename: (tags.title || "poster") + ".jpeg",
            folder:"sheryians/moodifi/posters"
        })
    ])

    const song = await songModel.create({
        title:tags.title,
        url:songFile.url,
        posterUrl:posterFile.url,
        mood
    })

    res.status(201).json({
        message: "Song created successfully",
        song
    })
}

const getSong = async(req, res)=>{
    const {mood} = req.query

    const song = await songModel.findOne({
        mood
    })

    res.status(200).json({
        message:"song fetched successfully.",
        song,
    })
}

module.exports = {
    uploadSong,
    getSong,
}