import { useState } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Alert, FormRow, Logo } from "../components";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};


const Register = (props) => {
  console.log(props.value);

  const [values, setValues] = useState(initialState);
  //use global context and state
  const {showAlert, displayAlert} = useAppContext()

  const toggleMember = ()=> {
    setValues({...values, isMember:! values.isMember})
  }

  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember} = values
    console.log(values);
    if (!email || !password || (isMember && !name)) {
      displayAlert()
      return
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember?'Login':'Register'}</h3>
        { showAlert && <Alert/>}
        {
          !values.isMember && 
          <FormRow
          name="name"
          type="text"
          handleChange={handleChange}
          value={values.name}
        />
        }
        <FormRow
          name="email"
          type="email"
          handleChange={handleChange}
          value={values.email}
        />
        <FormRow
          name="password"
          type="password"
          handleChange={handleChange}
          value={values.password}
        />
        <button type='submit' className='btn btn-block'>
        submit
      </button>
      <p>{values.isMember ? 'Not a member yet?' : 'Already a member?'}
      <button type='button' onClick={toggleMember} className='member-btn'>
        {values.isMember ? 'Register' : 'Login'}
      </button>
      </p>
      </form>
    </Wrapper>
  );
};
export default Register;
