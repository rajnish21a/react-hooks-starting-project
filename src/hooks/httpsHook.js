import { useReducer } from "react";

const initialState = {
  isLoading: false,
  error:null,
  data:null
}

const httpReducers = (httpState, action)=>{
  switch (action.type) {
    case 'SEND':
      return {
              isLoading:true,
              error:null,
              data:null
            };
    case 'RESPONSE':  
      return {
        ...httpState,
        isLoading: false,
        data: action.ResponseData
      };
    case 'ERROR':
      return {
        isLoading:false,
        error: action.error,
        data:null
      };
    case 'CLEAR':
      return initialState
    default:
      return initialState;
  }
}

const useHttps = ()=>{
  const [httpState,httpDispatcher]=useReducer(httpReducers,{
    isLoading:false,
    error:null,
    data: null
  })

  const sendRequest = (url, method, body)=>{
        httpDispatcher({type:"SEND"})
        fetch(url,{
          method:method,
          body:body,
          headers:{'Content-Type':'Application/json'}
        })
        .then((Response)=>{
          return Response.json();
        })
        .then((ResponseData)=>{
          httpDispatcher({type:"RESPONSE", ResponseData: ResponseData})
        })
        .catch(err=>{
          httpDispatcher({type:"ERROR", error:err.message})
        });
  };

  return {
    loading: httpState.isLoading,
    error: httpState.error,
    data: httpState.data,
    sendRequest: sendRequest
  }

}

export default useHttps;
