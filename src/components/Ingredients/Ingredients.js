import React, {  useCallback, useReducer, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from "../UI/ErrorModal";
import useHttps from "../../hooks/httpsHook";


const ingredientReducers = (currentIngredients, action)=>{
  switch (action.type) {
    case 'ADD':
      return [
        ...currentIngredients,
        action.ingredient
      ]
    case 'DELETE':  
      return currentIngredients.filter((ingrdient)=>{return ingrdient.id !== action.id })
    case 'SET':
      return action.ingredient;
    default:
      return currentIngredients;
  }
}


function Ingredients() {
  //const [userIngredients, setUserIngredients]= useState([]);
  // const [isLoading,setIsLoading]= useState(false);
  // const [error,setError]= useState("");
  const [userIngredients, dispatch]= useReducer(ingredientReducers,[]);
  const {loading, error, data, sendRequest} = useHttps();
  //const [httpGetState, httpDispatcher]= useReducer(httpReducers,{isLoading:false, error:null});
  useEffect(()=>{
    console.log("RENDERING A COMPONENT")
  })

  const onSearchIngredientHandler = useCallback(
    ingredientFound=>{
      //setUserIngredients(ingredientFound);
      dispatch({type:'SET', ingredient:ingredientFound})
    },[]
  ) 


  const addIngredientHandler = useCallback((Ingredient)=>{
    //setIsLoading(true);
    sendRequest("https://react-hooks-demo-project-b1b4e.firebaseio.com/ingredient.json","POST",JSON.stringify(Ingredient))
    // httpDispatcher({type:"SET"});
    // fetch("https://react-hooks-demo-project-b1b4e.firebaseio.com/ingredient.json",{
    //   method:'post',
    //   body:JSON.stringify(Ingredient),
    //   headers:{'Content-Type':'Application/json'}
    // })
    // .then(Response=>{
    //   httpDispatcher({type:"RESPONSE"})
    //   return Response.json();
    // })
    // .then(ResponseData=>{
    //   // setUserIngredients(prevState=>{
    //   //   return [...prevState,
    //   //     { 
    //   //       ...Ingredient,
    //   //       id: ResponseData.name
    //   //     }
    //   //   ]
    //   // })
    //   dispatch({type:'ADD', ingredient:{ 
    //           ...Ingredient,
    //           id: ResponseData.name
    //         }
    //   })
    // })
    // .catch(err=>{
    //   // setIsLoading(false);
    //   // setError(err.message);
    //   httpDispatcher({type:"ERROR", error:err.message});
    // });

  },[sendRequest])

  // const onErrorModalClose = useCallback(()=>{
  //   // setError(null);
  //   // setIsLoading(false);
  //   //httpDispatcher({type:"CLEAR"})
  // },[])

  const onIngredientDeleteHandler = useCallback((id)=>{
    sendRequest(`https://react-hooks-demo-project-b1b4e.firebaseio.com/ingredient/${id}.json`,'DELETE');
    // httpDispatcher({type:"SET"})
    // fetch(`https://react-hooks-demo-project-b1b4e.firebaseio.com/ingredient/${id}.json`,{
    //   method:'DELETE'
    // }).then((Response)=>{
    //         httpDispatcher({type:"RESPONSE"})
    //         // setUserIngredients(prevState=>{
    //         //   return prevState.filter(ingerdient=>{ return ingerdient.id !== id})
    //         // })
    //         dispatch({type:'DELETE', id:[id]})
    //   }
    // ).catch(err=>{
    //   // setIsLoading(false);
    //   // setError("SOME THING WENT WRONG");
    //   httpDispatcher({type:"ERROR", error:err.message})
    // });
  },[sendRequest]);

  return (
    <div className="App">
      { error && <ErrorModal onClose={
        ()=>{} //onErrorModalClose
      }>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} isLoading={loading} />

      <section>
        <Search onloadIngredientHandler={onSearchIngredientHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={onIngredientDeleteHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
