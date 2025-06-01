import { useEffect, useState } from 'react';
import { FaEthereum, FaArrowDown } from 'react-icons/fa';
import { ethers } from 'ethers';

export default function TotalFunds(){
    const [balance, setBalance] = useState("0.00");
    const [usdBalance, setUsdBalance] = useState("0.00");
    const [isOwner, setIsOwner] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);
    const [account, setAccount] = useState('');
    
    const contractAddress = "0xD8BD6d7EEEdb0023255f060b3794B92180Bb9289";
    const contractABI = [
    {
        "inputs": [],
        "name": "fund",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "i_owner",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBalance",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }
];

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                // Only fetch if ethereum object exists (MetaMask is connected)
                if (window.ethereum) {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const contract = new ethers.Contract(contractAddress, contractABI, provider);
                    
                    const balanceWei = await contract.getBalance();
                    const balanceEth = ethers.utils.formatEther(balanceWei);
                    setBalance(balanceEth);

                    const ethPrice = 2000;
                    const usdValue = (parseFloat(balanceEth) * ethPrice).toFixed(2);
                    setUsdBalance(usdValue);
                }
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, []);

    useEffect(() => {
        const checkConnectedAccount = async () => {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    setWalletConnected(true);
                } else {
                    setAccount('');
                    setWalletConnected(false);
                }
            }
        };
        checkConnectedAccount();
    }, []);

    useEffect(() => {
        if (window.ethereum) {
            const handleAccountsChanged = (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    setWalletConnected(true);
                } else {
                    setAccount('');
                    setWalletConnected(false);
                }
            };
            window.ethereum.on('accountsChanged', handleAccountsChanged);

            // Cleanup on unmount
            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            };
        }
    }, []);

    useEffect(() => {
        const checkOwner = async () => {
            if (walletConnected && account && window.ethereum) {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const contract = new ethers.Contract(contractAddress, contractABI, provider);
                    const owner = await contract.i_owner();
                    setIsOwner(owner.toLowerCase() === account.toLowerCase());
                } catch (err) {
                    setIsOwner(false);
                }
            } else {
                setIsOwner(false);
            }
        };
        checkOwner();
    }, [walletConnected, account]);

    const handleWithdraw = async () => {
        setTxStatus("");
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
        }
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const tx = await contract.withdraw();
            setTxStatus("Withdraw transaction submitted. Waiting for confirmation...");
            await tx.wait();
            setTxStatus("Funds withdrawn successfully!");
        } catch (error) {
            console.error(error);
            setTxStatus("Withdraw transaction failed or rejected.");
        }
    };

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
                        <a href="#" className="w-[900px] p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-transform duration-300 hover:scale-105">
                            <h1 className="text-white font-bold text-3xl">
                                Total Donations Collected So Far
                            </h1>
                            <div className="flex justify-center items-cente pt-6">
                                <FaEthereum className="inline-block w-16 h-16 text-white mb-2 pt-2" />
                                <h1 className="text-white font-extrabold text-6xl">
                                    {balance} ETH
                                </h1>
                            </div>
                            <h1 className="text-white text-2xl pt-2 mb-7">
                                approximately ${usdBalance} USD
                            </h1>
                            {isOwner && (
                                <button
                                    onClick={handleWithdraw}
                                    className=" bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold p-2 rounded-xl transition-colors duration-300"
                                >
                                    Withdraw Funds
                                </button>
                            )}
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