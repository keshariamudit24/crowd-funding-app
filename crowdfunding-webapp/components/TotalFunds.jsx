export default function TotalFunds(){
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
                                    12.03 ETH
                                </h1>
                            </div>
                            <h1 className="text-white text-2xl pt-2">
                                approximately $24,060 USD
                            </h1>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}