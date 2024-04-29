import { useState } from "react"
import ExpensesTable from "./expenses-table"
import ExpenseForm from "./expense-form"
export default function ExpensesContainer(props){
    const[search,setSearch]=useState("")
    const totalExpenses=()=>{
        const total=filterExpenses().reduce((acc,cv)=>{
            return acc+cv.amount
        },0)
        return total
    }
    const filterExpenses=()=>{
      const expense=props.expenses.filter((ele)=>{
        return (
           ele.description.includes(search) 
        )
      })
      return expense
    }
    return(
        <div>
           
            <h2>list of Expenses-{filterExpenses().length}</h2>
            <form>
                <label htmlFor="search">search</label>
                <input 
                type="text"
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
                id="search"
                /><br/>
            </form>
            <ExpensesTable expenses={filterExpenses()}
                           categories={props.categories}
                           removeExpense={props.removeExpense}

            />
            <h3>tottal Expenses-{totalExpenses()}</h3>
            <ExpenseForm categories={props.categories}      
                         addExpense={props.addExpense}            
            />
        </div>
    )
}