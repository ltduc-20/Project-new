import { useState, type FormEvent } from "react";
import type { film as FilmType } from "../../types/film";
import { supabase } from "../../utils/apputils";
import SelectGenre from "../../components/SelectGenre";
import SelectRating from "../../components/SelectRating";
function FilmUpsert() {
  const [film_Name, setfilm_Name] = useState<string>("");
  const [direcTor, setDirector] = useState<string>("");
  const [thumbnail_Url, setthumbnail_Url] = useState<string>("");
  const [trailer_url, setTrailer_url] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [genre_Id, setGenre_id] = useState<number >();
  const [rating_Id, setRating_id] = useState<number >();
  const [release_date, setRelease_date] = useState<string>("");
  const [is_showing, setIs_showing] = useState<boolean>(false);

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    
    const payload: FilmType = {
      film_name: film_Name,
      director: direcTor,
      thumbnail_url: thumbnail_Url,
      trailer_url,
      description,
      genre_id: genre_Id,
      rating_id: rating_Id,
      release_date,
      is_showing,
    };
      const res= await supabase.from("films").insert(payload);
      if(res.error)
      {
        alert("Error inserting film: "+res.error.message);
      }
      else{
        alert("Film inserted successfully");
      }
  }

  return <>
  <form onSubmit={handleSubmit}>

  <div className="mt-3">
    <label  className="form-label">Name</label>
    <input onChange={(ev)=>setfilm_Name(ev.target.value)}type="text" className="form-control" />
    </div>
  <div className="mt-3">
    <label htmlFor="" className="form-label">director</label>
    <input onChange={(ev)=>setDirector(ev.target.value)} type="text" className="form-control" />
    </div>
  <div className="mt-3">
    <label htmlFor="" className="form-label">thumbnail_url</label>
    <input onChange={(ev)=>setthumbnail_Url(ev.target.value)} type="text" className="form-control" />
    </div>
  <div className="mt-3">
    <label htmlFor="" className="form-label">trailer_url</label>
    <input onChange={(ev)=>setTrailer_url(ev.target.value)} type="text" className="form-control" />
    </div>
  <div className="mt-3">
    <label htmlFor="" className="form-label">description</label>
    <input onChange={(ev)=>setDescription(ev.target.value)} type="text" className="form-control" />
    </div>
  <div className="mt-3">
    <label htmlFor="" className="form-label">genre_id</label>
    <SelectGenre onChange={(id)=> setGenre_id(id)}/>
    </div>
  <div className="mt-3">
    <label htmlFor="" className="form-label">rating_id</label>
     <SelectRating onChange={(id)=> setRating_id(id)}/>
    </div>
  <div className="mt-3">
    <label htmlFor="" className="form-label">release_date</label>
    <input onChange={(ev)=>setRelease_date(ev.target.value)} type="date" className="form-control" />
    </div>
      <div className="mt-3">
    <label htmlFor="" className="form-label">is_showing</label>
    <input onChange={(ev)=>setIs_showing(ev.target.checked)} type="checkbox" className="form-check-input" />
    </div>
      <div className="mt-3">
    <input type="submit" value={"Them Thong Tin"} />
    </div>
  </form>
  </>
}
export default FilmUpsert;