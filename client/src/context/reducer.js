import { CLEAR_ALERT, DISPLAY_ALERT } from "./actions"
const reducer = (state, action) => {
  //alert action type
  if(action.type === DISPLAY_ALERT){
    return {...state, showAlert:true,alertType: 'danger',
    alertText: 'Please provide all values!',}
  }
  if(action.type === CLEAR_ALERT){
    return {
      ...state, showAlert: false, alertType:'', alertText:''
    }
  }
  //alert action type finish
  throw new Error(`no such action : ${action.type}`)
}
export default reducer