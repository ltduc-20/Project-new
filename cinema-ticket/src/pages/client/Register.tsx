import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/apputils";
 function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const navigate = useNavigate();
    async function RegisterUser() {
      if(email === '' || password === '') {
        alert('Please enter email and password');
        return;
      }
      if(password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
      }
     const response = await supabase.auth.signUp({
        email: email,
        password: password,
     });
        if(response.error) {
            alert('Dang ky that bai'+response.error.message);
            return;
        }
        alert('Register successful, please check your email to verify your account');
        navigate('/login');
            
    }
    return <>
    <div className="row">
        <div className="col-md-6">
            <h2>Register</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control"  value={email} 
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password}
                    onChange={(e) => setPassWord(e.target.value)}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={async() => await RegisterUser()}>Register</button>
            </form> 
        </div>
    </div>

    </>;
}
export default Register;