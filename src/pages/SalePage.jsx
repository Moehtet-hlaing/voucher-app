import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Container from '../components/Container'
import VoucherInfo from '../components/VoucherInfo'
import SaleForm from '../components/SaleForm'

const SalePage = () => {
  return (
    <div>
      <Container>
      <Breadcrumb currentPageTitle={"Sale Module"} />
      <VoucherInfo />
      
      </Container>
    </div>
  )
}

export default SalePage