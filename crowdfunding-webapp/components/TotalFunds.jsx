import { useEffect, useState } from 'react';
import { FaEthereum, FaArrowDown } from 'react-icons/fa';
import { ethers } from 'ethers';

export default function TotalFunds(){
    const [balance, setBalance] = useState("0.00");
    const [usdBalance, setUsdBalance] = useState("0.00");
    
    const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
    const contractABI = [
        {
            "inputs": [],
            "name": "getBalance",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                
                // Switch to Sepolia network if not already on it
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0xaa36a7' }], // Sepolia chainId
                });
                
                const contract = new ethers.Contract(contractAddress, contractABI, provider);
                
                const balanceWei = await contract.getBalance();
                const balanceEth = ethers.utils.formatEther(balanceWei);
                setBalance(balanceEth);

                // Fetch ETH price in USD (you might want to use a price feed API)
                const ethPrice = 2000; // Example fixed price
                const usdValue = (parseFloat(balanceEth) * ethPrice).toFixed(2);
                setUsdBalance(usdValue);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, []);

    return (
        <>
            <div className="pt-36">
                <div className="text-center max-w-2xl mx-auto">
                    <div>
                        <h1 className="font-bold text-4xl mb-4">
                            Making a Global Impact
                        </h1>
                    </div>
                    <div>
                        <p className="text-lg text-gray-600">
                            Your cryptocurrency donations help fund critical initiatives around the world. Together, we're building a better future for those in need.
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="flex justify-around text-center pt-16">
                        <a href="#" className="block w-[900px] h-[250px] p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-transform duration-300 hover:scale-105">
                            <h1 className="text-white font-bold text-3xl">
                                Total Donations Collected So Far
                            </h1>
                            <div className="flex justify-center items-cente pt-6">
                                <FaEthereum className="inline-block w-16 h-16 text-white mb-2 pt-2" />
                                <h1 className="text-white font-extrabold text-6xl">
                                    {balance} ETH
                                </h1>
                            </div>
                            <h1 className="text-white text-2xl pt-2">
                                approximately ${usdBalance} USD
                            </h1>
                        </a>
                    </div>
                </div>
                <div className='flex justify-center items-center mt-14'>
                    <FaArrowDown className='w-7 h-7'/>
                </div>
            </div>
        </>
    )
}