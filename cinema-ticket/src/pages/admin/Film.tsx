import { useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../utils/apputils";
import { useState } from "react";
import type { FilmList } from "../../types/film";
function Film() {
    const [films,setFilms] = useState <FilmList[]>([]);
    
    useEffect(() => {
        supabase.from('films').select(`
            id,
            film_name,
            thumbnail_url,
            mst_film_genres(genre_name),
            mst_film_ratings(rating_name),
            release_date
            `
        ).then(res=>
        {
           setFilms(res.data as FilmList[]);
        });
    }, [])
    return (
    <>
    <h1>Trang danh sach phim</h1>
    <Link to="filmupsert" className="btn btn-primary">Them phim moi</Link>
    <table className="table table-bordered mt-3">
        <thead>
            <tr>
                <th>STT</th>
                <th>Ten Phim</th>
                <th>Poster</th>
                <th>the loai</th>
                <th>Ngay chieu</th>
                <th></th>
            </tr>
          
                {films.map((film, index) => (
                    <tr key={film.id}>
                        <td>{index + 1}</td>
                        <td>{film.film_name}</td>
                        <td>
                            {film.thumbnail_url && (
                                <img src={film.thumbnail_url} alt={film.film_name} style={{ width: "100px" }} />
                            )}
                        </td>
                        <td>{film.mst_film_genres?.genre_name}</td>
                        <td>{film.release_date}</td>
                        <td>
                            <Link to={`filmupsert/${film.id}`} className="btn btn-sm btn-primary">
                                Sua
                            </Link>
                        </td>
                    </tr>
                ))}
            

        </thead>
        <tbody>
            
        </tbody>
    </table>
    </>
    );
}

export default Film;