import { React } from 'react'
import NavBar from '../components/NavBar'
import TotalFunds from '../components/TotalFunds'
import CryptoPayments from '../components/CryptoPayments'
import RazorpayPayments from '../components/RazorpayPayments'
import Impact from '../components/Impact'
import Footer from '../components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <NavBar />
      <TotalFunds />
      <div className="text-center pt-20 pb-8">
        <h1 className="font-bold text-4xl mb-4">
          Donate with Cryptocurrency
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your cryptocurrency donation directly funds our mission. Choose your preferred payment method and make a difference today.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 mx-auto max-w-7xl px-4">
        <div className="w-full md:w-1/2">
          <CryptoPayments />
        </div>
        <div className="w-full md:w-1/2">
          <RazorpayPayments />
        </div>
      </div>
      <Impact />
      <Footer />
    </div>
  )
}

export default App
