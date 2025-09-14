import React from 'react'
import Breadcrum from '../Components/Breadcrum/Breadcrum'
import { useParams } from "react-router-dom";

const Product = () => {

  const { productId } = useParams(); 
  return (
    <div>
      <Breadcrum productId={productId} />      
    </div>
  )
}

export default Product
