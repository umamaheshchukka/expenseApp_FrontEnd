import { useState } from "react"
import axios from "axios"
export default function CategoriesForm(props){
    const {addCategory}=props
    const[name,setName]=useState('')
    const[formErrors,setFormErrors]=useState({})
    const errors={}
    const validationErrors=()=>{
        if(name.trim().length==0){
            return errors.name='name is required'
        }
    }
    const handleAdd= async(e)=>{
        e.preventDefault()
        const formData={
            name:name,
        }
        validationErrors()
        if(Object.keys(errors).length==0){
            try{
                const response=await axios.post( 'http://localhost:3050/api/categories',formData,{
                            headers:{
                                Authorization:localStorage.getItem('token')
                            }
                        }) 
                        const result=response.data
                                addCategory(result)
                                setFormErrors('')
                                setName('')
            }
            catch(err){
                alert(err.message)
    
            }
        }else{
            setFormErrors(errors)
        }
      
        //     axios.post( 'http://localhost:3050/api/categories',formData,{
        //         headers:{
        //             Authorization:localStorage.getItem('token')
        //         }
        //     })
        //     .then((res)=>{
        //         const result=res.data
        //         addCategory(result)
        //         setName('')
        //     })
        //     .catch((err)=>{
        //         console.log(err)
        //     })
        }
    return(
        <div>
            <h4>add category</h4>
            <form onSubmit={handleAdd}>
                <label htmlFor="n">enter name</label>
                <input type="text"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        id="n"/>
                        {formErrors.name&&<span style={{ color: 'red'}}>{formErrors.name}</span>}<br/>
                <input type="submit"/>
            </form>
        </div>
    )
 }