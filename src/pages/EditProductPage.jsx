import React from 'react'
import Container from '../components/Container'
import Breadcrumb from '../components/Breadcrumb'
import CreateProductCard from '../components/CreateProductCard'
import EditProductCard from '../components/editProductCard'

const EditProductPage = () => {
  return (
    <div>
        <Container>
            <Breadcrumb currentPageTitle={"Edit Product"} links={[{title:"Product Module",path:"/dashboard/product"}]} />
            <EditProductCard />
        </Container>
    </div>
  )
}

export default EditProductPage