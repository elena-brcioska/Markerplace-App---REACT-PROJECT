import React from 'react';
import ProductForm from '../components/ProductForm/ProductForm';

const AddNewProduct = () => {
    return (
        <div>
            <ProductForm method="post"/>
        </div>
    );
};

export default AddNewProduct;