import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';
import useHttps from "../../hooks/httpsHook";

const Search = React.memo(props => {
 const [elementFiltered, setElementFiltered]= useState("");
 const {onloadIngredientHandler}= props;

 const searchInput = useRef();
 const {loading , error, data, sendRequest }=useHttps();

 useEffect(()=>{
  const timer = setInterval(() => {
    if(elementFiltered === searchInput.current.value && data !== null){
      const query = elementFiltered.length === 0 ? "":`?orderBy="title"&equalTo="${elementFiltered}"`;
      sendRequest("https://react-hooks-demo-project-b1b4e.firebaseio.com/ingredient.json" +query)
      // fetch("https://react-hooks-demo-project-b1b4e.firebaseio.com/ingredient.json" +query )
      // .then(Response=>{
      //   return Response.json();
      // })
      // .then(ResponseData=>{
      //   let IngredientObject=[];
      //   for(let Key in ResponseData){
      //     IngredientObject.push({
      //       id: Key,
      //       title: ResponseData[Key].title,
      //       amount: ResponseData[Key].amount
      //     })
      //   }
      //   props.onloadIngredientHandler(IngredientObject);
      // })
      let IngredientObject=[];
        for(let Key in data){
          IngredientObject.push({
            id: Key,
            title: data[Key].title,
            amount: data[Key].amount
          })
        }
        props.onloadIngredientHandler(IngredientObject);
    }
    }, 500);
    return ()=>{
      clearTimeout(timer);
    }

 },[elementFiltered,onloadIngredientHandler,searchInput,sendRequest]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" 
           ref={searchInput} 
           value={elementFiltered} 
           onChange={event=>{setElementFiltered(event.target.value)}} 
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
