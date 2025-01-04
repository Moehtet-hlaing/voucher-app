import React from 'react'
import Container from '../components/Container'
import Breadcrumb from '../components/Breadcrumb'
import VoucherCard from '../components/VoucherCard'

const VoucherDetailPage = () => {
    return (
        <div>
            <Container>
                <Breadcrumb currentPageTitle={"Voucher Detail"} links={[{title:"Voucher Module",path:"/voucher"}]} />
                <VoucherCard />
            </Container>
        </div>
      )
}

export default VoucherDetailPage