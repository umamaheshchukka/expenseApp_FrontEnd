
import CategoryItem from "./category-item"
 export default function CategoriesList(props){   
    return(
        <ul>
           { props.categories.map((ele)=>{
            return(
               <CategoryItem key={ele._id}
                             name={ele.name}
                             id={ele._id}
                             removeData={props.removeData}
                             />
            )
           })}
        </ul>
    )
}