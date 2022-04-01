import React, { useContext, createContext, useReducer } from 'react'
import { CLEAR_ALERT, DISPLAY_ALERT } from './actions'
import reducer from './reducer'
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  token: null,
  userLocation: '',
}
const AppContext = createContext()

const AppProvider = ({children})=> {

  const [state, dispatch] = useReducer( reducer,initialState)


  //alert
  const displayAlert = ()=> {
    dispatch({type:DISPLAY_ALERT})
    clearAlert()
  }
  const clearAlert = ()=> {
    setTimeout(()=>{
      dispatch({type:CLEAR_ALERT})
    },3000)
  }
  //alert finish

  //register 
  const registerUser = async(currentUser)=>{
    console.log(currentUser);
  }
  return (
    <AppContext.Provider value={{...state, displayAlert, registerUser}}>
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = ()=> {
  return useContext(AppContext)
}
export {AppProvider}