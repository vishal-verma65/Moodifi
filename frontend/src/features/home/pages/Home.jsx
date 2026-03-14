import React from 'react'
import FaceExpression from '../../expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
import '../style/homeStyle.scss'

const Home = () => {
    const {handleGetSong} = useSong()

    return (
        <section className="home-page">
            <div className="home-wrapper">
                <header className="home-header">
                    <h1>Moodifi</h1>
                    <p>Detect your expression and play songs that match your mood.</p>
                </header>

                <div className="home-grid">
                    <article className="card expression-card">
                        <h2>Face Expression</h2>
                        <FaceExpression onClick={(mood)=> handleGetSong({mood})} />
                    </article>

                    <article className="card player-card-container">
                        <h2>Now Playing</h2>
                        <Player />
                    </article>
                </div>
            </div>
        </section>
    )
}

export default Home