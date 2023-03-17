import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import ProductForm from '../components/ProductForm/ProductForm';

const EditProduct = () => {
    const data = useRouteLoaderData("product-details");
    return (
        <div>
            <ProductForm method="patch" product={data.product}/>
        </div>
    );
};

export default EditProduct;