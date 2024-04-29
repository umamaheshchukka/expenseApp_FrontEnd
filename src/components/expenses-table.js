
import ExpenseItem from "./expenseItem"
export default function ExpensesTable(props){
    return(
        <table className="table table-bordered" >
            <thead >
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>CategoryId</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                  {props.expenses.map((ele)=>{
                return(
                 <ExpenseItem key={ele._id}
                              expenses={ele}
                              id={ele._id}
                              categories={props.categories}
                              removeExpense={props.removeExpense}
                 />
                )
                    })} 
            </tbody>
        </table>
    )
}