import axios from 'axios'
export default function ExpenseItem(props){
    const handleRemove=async()=>{
        const confirmation=window.confirm('are you sure')
        if(confirmation){
            try{
                const response=await   axios.delete(`http://localhost:3050/api/expenses/${props.id}`,{
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                })
                props.removeExpense(response.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
    }
    const getCategoryName=(id)=>{
        const category=props.categories.find(ele => ele._id == id)
        if(category){
            return category.name
        }else{
            return 'n/A'
        }
    }
    return (
        <tr>
            <td>{props.expenses.expenseDate}</td>
            <td>{props.expenses.amount}</td>
            <td>{props.expenses.description}</td>
            <td>{getCategoryName(props.expenses.categoryId)}</td>
            <td>
                <button onClick={handleRemove}>romve</button>
            </td>
        </tr>
    )
}