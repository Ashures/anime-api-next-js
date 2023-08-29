"use client";

import { useEffect, useState } from "react";
import Anime from "./Anime";

export default function AnimeSearch() {
    const [search, setSearch] = useState("");
    const [newSearch, setNewSearch] = useState("");
    const [url, setUrl] = useState("https://api.jikan.moe/v4/top/anime?sfw&limit=24");
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
        if (search.trim() !== "") setUrl(`https://api.jikan.moe/v4/anime?sfw&limit=24&q=${search}`);
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
                    <button id="btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                    </button>
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