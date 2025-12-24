import { useEffect, useState } from "react";
import { supabase } from "../utils/apputils";

type SelectGenreProps = {
    selectedId?: number
    onChange?: (genreId:number) => void;
};
function SelectGenre({selectedId,onChange}: SelectGenreProps){
    const [genres, setGeneres] = useState<{id: number; name: string}[]>([]);
    useEffect(() => {
        supabase.from('mst_film_genres').select().then(res=>
        {
            if (!res.data) return;
            setGeneres(res.data?.map(i =>{
                return{
                    id:i.id,
                    name:i.genre_name
                }
            }))
        });
    },[]);
    return (
        <>
        <select onChange={(ev) => onChange && onChange(Number(ev.target.value))}className="form-select" >
            <option value="">--Chọn 1 giá trị---</option>
            {genres.map(genre=>(
                <option key={genre.id}
                selected={selectedId === genre.id}
                value={genre.id}>{genre.name}</option>
            )


            )}
        </select>
        </>
    );
}
 export default SelectGenre;