"use client";

export default function Anime({ anime }) {
    return (
        <div className="anime" id={anime.id}>
            <a href={anime.url}>
                <img src={anime.image} alt={anime.title} />
            </a>
            <div className="anime-info">
                <h1>{anime.title}</h1>
                <p>{anime.year}</p>
                <p>episodes: {anime.episodes}</p>
                <p>score: {anime.score}</p>
            </div>
        </div>
    );
}