"use client";

import { useEffect, useState } from "react";
import Anime from "./Anime";

export default function AnimeSearch() {
    const [search, setSearch] = useState("");
    const [newSearch, setNewSearch] = useState("");
    const [url, setUrl] = useState("https://api.jikan.moe/v4/anime?sfw&limit=24");
    const [anime, setAnime] = useState([]);

    useEffect(() => {
        async function fetchAnime() {
            const res = await fetch(url);
            const data = await res.json();
            
            setAnime(data.data != null ? data.data.map((d) => {
                return {
                    id: d.mal_id,
                    title: d.title,
                    image: d.images.webp.large_image_url,
                    episodes: d.episodes,
                    score: d.score,
                    year: d.year,
                    url: d.url,
                };
            }) : []);
        }

        fetchAnime();
    }, [url]);

    useEffect(() => {
        setUrl(`https://api.jikan.moe/v4/anime?sfw&limit=24&q=${search}`);
    }, [search]);

    function handleSubmit(e) {
        e.preventDefault();
        if (newSearch === "") return;

        setSearch(newSearch);
        
        setNewSearch("");
    }

    return (
        <div className="anime-main">
            <form onSubmit={handleSubmit} className="search-bar">
                <label htmlFor="search">find anime</label>
                <div className="search">
                    <input value={newSearch} onChange={e => setNewSearch(e.target.value)} type="text" id="search" />
                    <button id="btn">search</button>
                </div>
            </form>
            <div className="anime-display">
                {anime.length > 0 ? anime.map((a) => {
                    return (
                        <Anime key={a.id} anime={a} />
                    );
                }) : "No anime to show."}
            </div>
        </div>
    );
}