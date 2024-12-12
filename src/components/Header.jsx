import React from 'react'
import Container from './Container'

const Header = () => {
  return (
    <header className=' mb-5'>
        <Container className={``}>
        <h1 className=' font-bold text-3xl'>Voucher App</h1>
        <p className=' text-slate-700'>MMS Software</p>
        </Container>
    </header>
  )
}

export default Header