import { FaMoneyBillWave, FaProjectDiagram, FaUsers, FaGlobeAmericas } from 'react-icons/fa';

export default function Impact(){
    return (
        <>
            <div className="pt-32">
                <div className="text-center max-w-2xl mx-auto">
                    <div>
                        <h1 className="font-bold text-4xl mb-4">
                            Our Impact
                        </h1>
                    </div>
                    <div>
                        <p className="text-lg text-gray-600">
                            Your donations have helped us make real change in communities worldwide. Here's what we've accomplished together so far.
                        </p>
                    </div>
                </div>
                
                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 mt-16 pb-18">
                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
                        <div className="text-blue-600 text-4xl mb-4 flex justify-center">
                            <FaMoneyBillWave />
                        </div>
                        <h2 className="text-5xl font-bold text-blue-600 mb-2">$2M+</h2>
                        <p className="text-gray-600">Funds Raised</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
                        <div className="text-blue-600 text-4xl mb-4 flex justify-center">
                            <FaProjectDiagram />
                        </div>
                        <h2 className="text-5xl font-bold text-blue-600 mb-2">150+</h2>
                        <p className="text-gray-600">Projects Funded</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
                        <div className="text-blue-600 text-4xl mb-4 flex justify-center">
                            <FaUsers />
                        </div>
                        <h2 className="text-5xl font-bold text-blue-600 mb-2">50K+</h2>
                        <p className="text-gray-600">Donors</p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
                        <div className="text-blue-600 text-4xl mb-4 flex justify-center">
                            <FaGlobeAmericas />
                        </div>
                        <h2 className="text-5xl font-bold text-blue-600 mb-2">75+</h2>
                        <p className="text-gray-600">Countries Reached</p>
                    </div>
                </div>
                <div className="text-center max-w-2xl mx-auto pb-14">
                    <div>
                        <p className="text-lg text-gray-600">
                            Every crypto donation contributes directly to these initiatives. Join us in creating a better world for those who need it most.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}