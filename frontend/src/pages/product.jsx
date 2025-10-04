import React, {useContext} from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrum/Breadcrum.jsx';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay.jsx';
import Descriptionbox from '../components/Descriptionbox/descriptionbox.jsx';
import Relatedproducts from '../components/RelatedProducts/relatedproducts.jsx';

const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_product.find((e) => e.id === parseInt(productId));
    return (
        <div>
           <Breadcrum product={product}/>
           <ProductDisplay product={product}/>
           <Descriptionbox/>
           <Relatedproducts/>
        </div>
    );
}

export default Product;