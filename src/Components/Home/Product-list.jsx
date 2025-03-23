
import { Link } from 'react-router-dom';
import products from '../../product.json';
import useProductContext from '../../Contexts/ProductContext';
import EmptyPage from '../EmptyPage';
  
  export default function ProductList() {


    const {searchValue} = useProductContext();

    const filteredProductList = searchValue == "" ? products : products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()));


    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          {
            filteredProductList.length > 0 ? 
          
          (<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {filteredProductList.map((product) => (
              <Link key={product.id} href={product.href} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    alt=""
                    src={product.imageSrc}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <Link to={`/product/${product.id}`}>{product.name}</Link>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
              </Link>
            ))}
          </div>) : 
          <EmptyPage/>
          }
        </div>
      </div>
    )
  }
  