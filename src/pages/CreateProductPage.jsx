import React from 'react'
import Container from '../components/Container'
import Breadcrumb from '../components/Breadcrumb'
import CreateProductCard from '../components/CreateProductCard'

const CreateProductPage = () => {
  return (
    <div>
        <Container>
            <Breadcrumb currentPageTitle={"Create Product"} links={[{title:"Product Module",path:"/product"}]} />
            <CreateProductCard />
        </Container>
    </div>
  )
}

export default CreateProductPage