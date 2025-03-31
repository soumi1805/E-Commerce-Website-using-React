
import { Link, useLocation } from 'react-router-dom';
import useProductContext from '../../Contexts/ProductContext';


import { useParams } from 'react-router-dom';
  
  export default function ProductList() {


    const {searchValue} = useProductContext();
    const {productList} = useProductContext();
    const {pathname} = useLocation();

    const { category } = useParams();


 

    

    const filteredProductListSearch = searchValue == "" ? productList : productList.filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()));

    const filteredProductListCategory = category == "" ? productList :  productList.filter(
      (product) => product.category?.toLowerCase() === category?.toLowerCase()
    );

    const featuredProducts = productList.slice(0, 6);

    const filteredProductList = pathname == '/' ? featuredProducts : category ? filteredProductListCategory : filteredProductListSearch;

    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2 bg-stone-200">
          {filteredProductList.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
              <Link to={`/product/${product.id}` } state={product}>
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="w-full h-80 object-cover rounded-md"
                />
                <h3 className="mt-4 text-lg font-medium text-gray-900">{product.title}</h3>
                <p className="text-gray-500">{product.color}</p>
                <p className="mt-2 text-lg font-semibold text-green-600">Rs.{product.price}</p>
              </Link>
            </div>
          ))}
        </div> 
    )
  }
  