import axios from "axios"
export default function CategoryItem(props){
    console.log(props)
    const handleDelete=async()=>{
        const confirmation=window.confirm(`r u sure to delete ${ props.name}`)
        if(confirmation){ 
            try{
            const response=await axios.delete(`http://localhost:3050/api/categories/${props.id}`,{
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                 })
                 props.removeData(response.data)
                }catch(err){
                    alert(err.message)
            
                }}}
        //  axios.delete(`http://localhost:3050/api/categories/${props.id}`,{
        //     headers:{
        //         Authorization:localStorage.getItem('token')
        //     }
        //  })
        // .then((res)=>{
        //     const result=res.data
        //     props.removeData(result)
        // })
    return(
        <div>
        <li>{props.name}<button onClick={handleDelete}>remove</button></li>
        </div>
    )
}