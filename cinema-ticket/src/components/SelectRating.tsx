import { useEffect, useState } from "react";
import { supabase } from "../utils/apputils";
type SelectRatingProps = {
    selectedId?: number
    onChange?: (ratingId:number) => void;
};
function SelectRating({selectedId,onChange}: SelectRatingProps)
{
    const [Ratings,setRating] = useState <{id:number;name:string}[]>([]);
        useEffect(() => {
            supabase.from('mst_film_ratings').select().then(res=>
            {
                if (!res.data) return;
                setRating(res.data?.map(i =>{
                    return{
                        id:i.id,
                        name:i.rating_name
                    }
                }))
            });
        },[]);
    return(
             <select onChange={(ev) => onChange && onChange(Number(ev.target.value))} className="form-select" >
            <option value=''>--Chọn 1 thể loại---</option>
            {Ratings.map(rating=>(
                <option key={rating.id}
                selected={selectedId === rating.id}
                value={rating.id}>{rating.name}</option>
                 )


            )}
        </select>
    )
}
export default SelectRating