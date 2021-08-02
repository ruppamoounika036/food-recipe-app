import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import style from './recipe.module.css';
import "./App.css";
import imagerecipe from './imagerecipe.png';
const  App = () => {
  const appId='c08b1c27';
  const app_key='46e9281fdd13a937e65c8c66a9d0a384';
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch]=useState('');
  const [query , setQuery]=useState('chicken');
  useEffect(() => {
   getRecipes();
  },[query]);

  const getRecipes= async() => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${app_key}`
      );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
};

const updateSearch= e => {
  setSearch(e.target.value);
};
const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}
  return (
     <div className="App">
       <div className={style.recipe}>
       <img className={style.image2} src={imagerecipe} alt="" />
       <div className={style.searchContainor}>
         <h1 className={style.searchfont}>
           Food Recipes
           </h1>
           <p className={style.searchfont}>Search for healthy recipes for meals & snacks.</p>
           <div className="body">
       <form onSubmit={getSearch} className="search-form">
         <div clasName="search-bar">
         <input type="text" placeholder="Search Recipe" value={search} onChange={updateSearch} />
         <button className="search-button" type="submit">
          Search
        </button>
         </div>
       </form>
       </div>
       </div>
       </div>
       <div className="recipes">
       {recipes.map(recipe => (
         <Recipe
         key={recipe.recipe.label}
         title={recipe.recipe.label}
         calories={recipe.recipe.calories}
         image={recipe.recipe.image}
         ingredients={recipe.recipe.ingredients}
         />
       ))}
       </div>
     </div>
   );
 };
 export default App;
