"use client";

export default function Anime({ anime }) {
    return (
        <div className="anime" id={anime.id}>
            <img src={anime.image} alt={anime.title} />
            <div className="anime-info">
                <h1>{anime.title}</h1>
                <p>{anime.year}</p>
                <p>episodes: {anime.episodes}</p>
                <p>score: {anime.episodes}</p>
            </div>
        </div>
    );
}