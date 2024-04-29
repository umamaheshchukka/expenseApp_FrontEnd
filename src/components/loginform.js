import { useState } from 'react'
import axios from 'axios'
 export default  function LoginForm(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [formErrors,setFormErrors]=useState({})
    const errors={}
    const[serverErrors,setServerErrors]=useState('')
    const validationErrors=()=>{
        if(email.trim().length==0){
            return errors.email="email is required"
        }
        if(password.trim().length==0){
            return errors.password='password is required'
        }
    }
    const handleSubmit =async (e) => {
        e.preventDefault()  
        const formData = {
            email,
            password 
        }
        validationErrors()
        if(Object.keys(errors).length==0){
            try{
                const response=await axios.post('http://localhost:3050/api/users/login', formData)
                const token=response.data.token
                localStorage.setItem('token',token)
                props.loginSuccess()
                alert('succesfuly lgdn')
            }
            catch(err){
                setServerErrors(err.response.data.notice)
    
            }
        }
        else{
            setFormErrors(errors)
        }
       
        // axios.post('http://localhost:3050/api/users/login', formData,{
        //     headers:{
        //         Authorization:localStorage.getItem('token')
        //     }
        // })
        //     .then((response) => {
        //         const token = response.data.token 
        //         console.log(token)
        //         localStorage.setItem('token', token)
        //         alert('successfully logged in')
        //         props.loginSuccess()
        //     })
        //     .catch((err) => {
        //         setServerErrors(err.response.data.notice)
        //     })
    }
    return (
        <div>
            <h2>Login</h2>
            { serverErrors && <p style={{ color: 'red'}}>{ serverErrors }</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter Email</label> <br />
                <input 
                    type="text" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    id="email" 
                    name="email" 
                /> 
                {formErrors.email&&<span>{formErrors.email}</span>}
                <br/>
                <label htmlFor="password">Enter Password</label> <br />
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} id="password" 
                    name="password" 
                />
                  {formErrors.password&&<span>{formErrors.password}</span>}
                 <br/>
                <input type="submit" /> 
            </form>
        </div>
    )
}