import { useState,useEffect } from "react";
import axios from "axios";
import CategoriesContainer from "./categories-container";
import ExpensesContainer from "./expense-container";
import LoginForm from "./loginform";
function Categories(){
    const[userLogdIn,setUserLogdIn]=useState(false)
    const[categories,setCategories]=useState([])
    const [expenses,setExpenses]=useState([])
    useEffect(()=>{
        if(userLogdIn) {
            (async()=>{
                try{
                const categoryResponse=await axios.get('http://localhost:3050/api/categories',{
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                })
                setCategories(categoryResponse.data)
                }
                catch(err){
                        alert(err.message)
                    }
                try{
                    const expenseResponse=await axios.get('http://localhost:3050/api/expenses',{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            }) 
            setExpenses(expenseResponse.data) 
                } 
            catch(err){
                console.log(err.message)
            }
            })()
        } else {
            setCategories([])
            setExpenses([])
        }
       
    },[userLogdIn])
    // useEffect(()=>{
    //     axios.get('http://localhost:3050/api/expenses',{
    //         headers:{
    //             Authorization:localStorage.getItem('token')
    //         }
    //     })
    //         .then((res)=>{
    //             const result=res.data
    //             setExpenses(result)
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         })
    // },[userLogdIn])
    useEffect(()=>{
        if(localStorage.getItem('token')){
            setUserLogdIn(true)
        }else{
            setUserLogdIn(false)
        }

    },[])
    const addCategory=(data)=>{
        setCategories([...categories,data])
    }
    const removeData=(data)=>{
       const  newArr=categories.filter((ele)=>{
            return(ele._id!=data._id)
        })
        setCategories(newArr)
    }
   const addExpense=(data)=>{
    setExpenses([...expenses,data])
   }
    const  removeExpense=(data)=>{
        const newArr=expenses.filter((ele)=>{
            return(ele._id!=data._id)
        })
        setExpenses(newArr)
    }
    const loginSuccess=()=>{
        setUserLogdIn(true)
    }
    const handleLogOut=()=>{
        setUserLogdIn(false)
        localStorage.removeItem('token')
    }
    return(
        <div>
            <h1>Expense app</h1>  
            {userLogdIn ?(
                <div>
                    <button onClick={handleLogOut}>logOut</button>
                  <CategoriesContainer 
                  categories={categories} 
                  addCategory={addCategory}   
                  removeData={removeData} 
              />

              <ExpensesContainer 
                  expenses={expenses}
                  categories={categories}
                  addExpense={addExpense}
                  removeExpense={removeExpense}
              />
              </div>
            ) :(
                <div>
                   <LoginForm loginSuccess={loginSuccess}/> 
                </div>

            )}
                  
        
        </div>

    )
}
export default Categories 



