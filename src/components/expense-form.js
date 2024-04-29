import { useState } from "react"
import axios from "axios"
export default function ExpenseForm(props){
const[expenseDate,setexpenseDate]=useState('')
const[amount,setAmount]=useState('')
const[description,setDescription]=useState('')
const[categoryId,setCategoryId]=useState('')
const [formErrors,setFormErrors]=useState({})
const errors={}
const validationErrors=()=>{
    if(amount.trim().length==0){
     errors.amount='amount is required'
    }
    if(expenseDate.trim().length==0){
        errors.expenseDate="date is required"
    }
    if(description.trim().length==0){
        errors.description='description is required'
    }
    if(categoryId.trim().length==0){
        errors.categoryId="categoryId is required"
    }
}
const handleSubmit=async(e)=>{
    e.preventDefault()
    const formData={
        expenseDate,
        amount,
        description,
        categoryId
    }
    validationErrors()
if(Object.keys(errors).length==0){
    try{
    const response=await axios.post('http://localhost:3050/api/expenses',formData,{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
    props.addExpense(response.data)
     setFormErrors('')
     setAmount('')
     setCategoryId('')
     setDescription('')
     setexpenseDate('')
    }catch(err){
        console.log(err)
    }
}else{
    setFormErrors(errors)
}

    // axios.post('http://localhost:3050/api/expenses',formData)
    //  .then((res)=>{
    //  props.addExpenses(res.data)
    //  console.log(res.data)
    //  setFormErrors('')
    //  setAmount('')
    //  setCategoryId('')
    //  setDescription('')
    //  setexpenseDate('')
       
    //  })
    //  .catch((err)=>{
    //     console.log(err.message.data)
    //  })
}
    return(
        <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="date">Select Date</label>
            <input
            type="date"
            value={expenseDate}
            onChange={(e)=>{setexpenseDate(e.target.value)}}
            id="date"/>
             { formErrors.expenseDate&&<span>{formErrors.expenseDate}</span>}
            <br/>
            <label htmlFor="amount">Enter amount</label>
            <input 
             type="number"
             value={amount}
             onChange={(e)=>{setAmount(e.target.value)}}
             id="amount"/>
             { formErrors.amount&&<span >{formErrors.amount}</span>}
             <br/>
             <label htmlFor="cat">Select Category</label>
             <select 
             value={categoryId}
             onChange={(e)=>{setCategoryId(e.target.value)}}>
                <option>select</option>
                {props.categories.map((ele)=>{
                    return(
                        <option key={ele._id} value={ele._id}>{ele.name}</option>
                    )
                })}
             </select>
             { formErrors.categoryId&&<span >{formErrors.categoryId}</span>}
             <br/>
             <label htmlFor="des">Enter description</label>
             <input
             type="text"
             value={description}
             onChange={(e)=>{setDescription(e.target.value)}}
             id="des"/>
              { formErrors.description&&<span >{formErrors.description}</span>}
             <br/>
             <input type="submit"/>
        </form>
        </div>
    )
}