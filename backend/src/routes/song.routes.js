const {Router} = require("express")
const songController = require("../controllers/song.controller")
const upload = require("../middlewares/upload.middleware")


const songRouter = Router()

/**
 * @route POST /api/songs/
 * @desc upload a song
 * @access private
 */
songRouter.post("/", upload.single("song"), songController.uploadSong )

/**
 * @route GET /api/songs/
 * @desc get a song based on mood
 * @access private
 */
songRouter.get("/", songController.getSong)

module.exports = songRouter