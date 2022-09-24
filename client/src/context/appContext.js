import React, { useContext, createContext, useReducer } from "react";
import axios from "axios";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  LOGOUT_USER,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR,
} from "./actions";
import reducer from "./reducer";

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')


export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user?JSON.parse(user):null,
  token: token,
  userLocation: userLocation || "",
  jobLocaiton: userLocation || "",
  showSidebar: false
};


const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //alert
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  //alert finish

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('location')
  }
  //register and login
  const setUpUser= async ({currentUser,endPoint,alertText})=>{
    dispatch({type:SETUP_USER_BEGIN})
    try {
      const {data} = await axios.post(`/api/v1/auth/${endPoint}`,currentUser)
      const {user, token, location} = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {user, token, location, alertText}
      })
      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const toggleSidebar =()=> {
    dispatch({type: TOGGLE_SIDEBAR})
  }
 
  const logoutUser = () => {
    dispatch({type: LOGOUT_USER})
    removeUserFromLocalStorage()
  }
    
  return (
    <AppContext.Provider value={{ ...state, displayAlert, setUpUser, toggleSidebar, logoutUser }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider };
