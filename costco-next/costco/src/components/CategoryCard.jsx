
import Link from 'next/link';

// import { useRouter} from "next/navigation";

export default function CategoryCard({ category }) {

    //console.log ("category id: ", category.id);

    // const handleLinkClick = async (event) => {
    //     event.preventDefault ();
    //     console.log ("Link Clicked: ", category);
    //     console.log ("Event : ", event.target, " target.name= ", event.target.name, " target.value= ", event.target.value)
    //     //fetch products for this category
    //     //go to products list page
    //     const nextRouter = useRouter ();
    //     nextRouter.push (`/products/${category.id}`)
    // }

    return (
        <Link
            href={{
                pathname: `/categories/${category.categoryId}`,
                query: { name: category.name },
            }}
            className="category-card"
        >
            <img
                src={category.image}
                alt={category.name}
                className="category-image"
            />

            <div className="category-title">
                {category.name}
            </div>
        </Link>
    );
}

