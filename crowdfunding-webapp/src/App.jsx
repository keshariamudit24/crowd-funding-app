import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cryptopayments from "../components/CryptoPayments"
import NavBar from "../components/NavBar"
import TotalFunds from "../components/TotalFunds"
import Impact from "../components/Impact"
import Footer from "../components/Footer"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <TotalFunds />
      <Cryptopayments />
      <Impact />
      <Footer />
    </>
  )
}

export default App
