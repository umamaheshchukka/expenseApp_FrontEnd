import CategoriesList from "./categories-list"
import CategoriesForm from "./category-form"
export default function CategoriesContainer(props){
    return(
        <div>
            <h3>list of categories-{props.categories.length}</h3>
            <CategoriesList categories={props.categories}
                            removeData={props.removeData}/>
            <CategoriesForm addCategory={props.addCategory}/> 
        </div>
    )
}