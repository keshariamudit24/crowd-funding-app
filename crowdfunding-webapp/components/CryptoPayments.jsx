import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

const CONTRACT_ADDRESS = "0xD8BD6d7EEEdb0023255f060b3794B92180Bb9289";
const CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "fund",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
    // Add other ABI entries if needed
];

export default function CryptoPayments() {
    const [walletConnected, setWalletConnected] = useState(false);
    const [account, setAccount] = useState('');
    const [ethAmount, setEthAmount] = useState("0.05");
    const [usdValue, setUsdValue] = useState("0.00");
    const [txStatus, setTxStatus] = useState("");

    // Check wallet connection on load
    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
                setWalletConnected(accounts.length > 0);
                if (accounts.length > 0) setAccount(accounts[0]);
            });
        }
    }, []);

    // Fetch ETH to USD conversion (mocked here for simplicity)
    useEffect(() => {
        const ethToUsd = 2636.49; // replace with real API if needed
        const usd = (parseFloat(ethAmount) * ethToUsd).toFixed(2);
        setUsdValue(usd);
    }, [ethAmount]);

    const handleDonate = async () => {
        setTxStatus("");
        if (!window.ethereum) {
            toast.error("Please install MetaMask!");
            return;
        }

        // Validate donation amount
        const amount = parseFloat(ethAmount);
        if (isNaN(amount) || amount <= 0) {
            toast.warning("Please enter an amount greater than 0 ETH", {
                position: "top-right",
                autoClose: 5000
            });
            return;
        }

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            toast.info("Processing donation...", {
                position: "top-right",
                autoClose: 5000
            });

            const tx = await contract.fund({
                value: ethers.utils.parseEther(ethAmount)
            });

            setTxStatus("Transaction submitted. Waiting for confirmation...");
            await tx.wait();
            toast.success("Thank you for your donation!", {
                position: "top-right",
                autoClose: 5000
            });
            setTxStatus("Thank you for your donation! Transaction confirmed.");
        } catch (error) {
            console.error(error);
            setTxStatus("Transaction failed or rejected.");
            toast.error("Transaction failed or rejected", {
                position: "top-right",
                autoClose: 5000
            });
        }
    };

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                });

                window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
                    setWalletConnected(accounts.length > 0);
                    if (accounts.length > 0) setAccount(accounts[0]);
                });
                
                // Switch to Sepolia network
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0xaa36a7' }], // Sepolia chainId
                });

                setAccount(accounts[0]);
            } else {
                alert('Please install MetaMask!');
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    return (
        <>
            <div className="pt-20">
                <div className="text-center max-w-2xl mx-auto">
                    <div>
                        <h1 className="font-bold text-4xl mb-4">
                            Donate with Cryptocurrency
                        </h1>
                    </div>
                    <div>
                        <p className="text-lg text-gray-600">
                            Your cryptocurrency donation directly funds our mission. Connect your wallet and make a difference today.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4 pt-16">
                    {walletConnected ? (
                        <div className="w-full max-w-lg">
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                {/* Wallet Connection Status */}
                                <div className="flex items-center mb-8">
                                    <div className="h-8 w-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-xl">✓</span>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Wallet Connected
                                    </h2>
                                </div>

                                {/* Donation Amount Input */}
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-lg font-medium mb-3">
                                        Donation Amount (ETH)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={ethAmount}
                                            onChange={(e) => setEthAmount(e.target.value)}
                                            className="w-full px-4 py-3 text-2xl border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            placeholder="0.05"
                                            min="0"
                                        />
                                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
                                            ETH
                                        </span>
                                    </div>
                                </div>

                                {/* USD Conversion */}
                                <div className="mb-8">
                                    <p className="text-gray-600 text-lg">
                                        Approximately ${usdValue} USD
                                    </p>
                                </div>

                                {/* Donate Button */}
                                <button
                                    onClick={handleDonate}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-4 rounded-xl transition-colors duration-300"
                                >
                                    Donate with Crypto
                                </button>

                                {/* Transaction Status */}
                                {txStatus && (
                                    <p className="text-center mt-4 text-gray-700">{txStatus}</p>
                                )}

                                {/* Footer Text */}
                                <p className="text-gray-500 text-center mt-6">
                                    Your donation will be processed securely. Thank you for your generosity!
                                </p>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={connectWallet}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-lg transition-colors duration-300"
                        >
                            Connect Wallet
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}