import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function TotalFunds(){
    const [balance, setBalance] = useState("0.00");
    const [usdBalance, setUsdBalance] = useState("0.00");
    
    const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
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
                const provider = new ethers.providers.Web3Provider(window.ethereum);
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
            <div className="pt-20">
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
                        <a href="#" className="block w-[800px] h-[250px] p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h1 className="text-white font-bold text-4xl">
                                Total Donations Collected So Far
                            </h1>
                            <div className="pt-2">
                                <img src="" alt="eth icon" />
                                <h1 className="text-white font-extrabold text-8xl">
                                    {balance} ETH
                                </h1>
                            </div>
                            <h1 className="text-white text-2xl pt-2">
                                approximately ${usdBalance} USD
                            </h1>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}