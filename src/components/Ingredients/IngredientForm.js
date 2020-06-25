import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import Spinner from "../UI/LoadingIndicator";

const IngredientForm = React.memo(props => {
  const [initialStateTitle, setInitialStateTitle] = useState('');
  const [initialStateAmount, setInitialStateAmount] = useState('');
  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title: initialStateTitle, amount:initialStateAmount});
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" 
             value={initialStateTitle.title} 
            onChange={event=>{
                setInitialStateTitle(event.target.value)
              }
            } 
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" 
             value={initialStateAmount} 
             onChange={event=>{
                setInitialStateAmount(event.target.value)
              }
            }  
             />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.isLoading && <Spinner/>}
          </div>
        </form>
      </Card>
    </section>
  )
});

export default IngredientForm;
