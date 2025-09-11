"use client";
import React, { useState } from 'react';
import UserNav from '@/components/UserNav';

const Page = () => {
    const [activeTab, setActiveTab] = useState('doshas');

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
            <UserNav />
            
            <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="max-w-3xl space-y-6 text-center mb-12">
                    <div className="inline-block rounded-full bg-green-200 px-4 py-2 text-sm font-medium text-green-800">
                        Ancient Wisdom
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-green-900 sm:text-5xl">
                        Ayurvedic Herbal Medicine
                    </h1>
                    <p className="text-lg text-green-700 md:text-xl">
                        Discover the ancient healing system of Ayurveda and how medicinal plants are used to balance mind, body, and spirit.
                    </p>
                </div>

                {/* Content Section */}
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-10">
                    <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
                        Understanding Ayurvedic Medicine
                    </h2>
                    <p className="text-green-700 text-lg leading-relaxed">
                        Ayurveda is one of the world's oldest holistic healing systems, developed more than 3,000 years ago in India. It's based on the belief that health and wellness depend on a delicate balance between the mind, body, and spirit. The primary focus of Ayurvedic medicine is to promote good health, rather than fight disease.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="w-full max-w-2xl bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="grid grid-cols-3 divide-x divide-green-100">
                        <button 
                            className={`py-4 px-2 text-sm font-medium transition-colors duration-200 ${
                                activeTab === 'doshas' 
                                ? 'text-white bg-green-700' 
                                : 'text-green-700 bg-green-50 hover:bg-green-100'
                            }`}
                            onClick={() => setActiveTab('doshas')}
                        >
                            The Three Doshas
                        </button>
                        <button 
                            className={`py-4 px-2 text-sm font-medium transition-colors duration-200 ${
                                activeTab === 'herbs' 
                                ? 'text-white bg-green-700' 
                                : 'text-green-700 bg-green-50 hover:bg-green-100'
                            }`}
                            onClick={() => setActiveTab('herbs')}
                        >
                            Ayurvedic Herbs
                        </button>
                        <button 
                            className={`py-4 px-2 text-sm font-medium transition-colors duration-200 ${
                                activeTab === 'practices' 
                                ? 'text-white bg-green-700' 
                                : 'text-green-700 bg-green-50 hover:bg-green-100'
                            }`}
                            onClick={() => setActiveTab('practices')}
                        >
                            Ayurvedic Practices
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-10">
                    {activeTab === 'doshas' && (
                        <div className="animate-fadeIn">
                            <h3 className="text-2xl font-bold text-green-800 mb-8 text-center">The Three Doshas</h3>
                            <p className="text-green-700 mb-10 text-center max-w-3xl mx-auto">
                                According to Ayurveda, each person has a unique pattern of energy—a specific combination of physical, mental, and emotional characteristics. This is called your dosha. There are three doshas, and though everyone has all three, most people have one or two that are dominant.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Vata Dosha Card */}
                                <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl p-6 shadow-md">
                                    <h4 className="text-xl font-bold text-blue-800 mb-2">Vata Dosha</h4>
                                    <p className="text-blue-600 font-medium mb-4">Air & Space Elements</p>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h5 className="font-semibold text-blue-700 mb-1">Physical traits:</h5>
                                            <p className="text-blue-600 text-sm">Thin, light frame, dry skin, cold hands and feet</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-blue-700 mb-1">Mental traits:</h5>
                                            <p className="text-blue-600 text-sm">Creative, quick thinking, easily distracted</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-blue-700 mb-1">Imbalance signs:</h5>
                                            <p className="text-blue-600 text-sm">Anxiety, insomnia, digestive issues, dry skin</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-blue-700 mb-1">Balancing herbs:</h5>
                                            <p className="text-blue-600 text-sm">Ashwagandha, Ginger, Holy Basil (Tulsi)</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Pitta Dosha Card */}
                                <div className="bg-gradient-to-b from-red-50 to-red-100 rounded-xl p-6 shadow-md">
                                    <h4 className="text-xl font-bold text-red-800 mb-2">Pitta Dosha</h4>
                                    <p className="text-red-600 font-medium mb-4">Fire & Water Elements</p>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h5 className="font-semibold text-red-700 mb-1">Physical traits:</h5>
                                            <p className="text-red-600 text-sm">Medium build, warm skin, strong digestion</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-red-700 mb-1">Mental traits:</h5>
                                            <p className="text-red-600 text-sm">Intelligent, focused, competitive</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-red-700 mb-1">Imbalance signs:</h5>
                                            <p className="text-red-600 text-sm">Inflammation, rashes, irritability, acid reflux</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-red-700 mb-1">Balancing herbs:</h5>
                                            <p className="text-red-600 text-sm">Coriander, Aloe Vera, Mint, Chamomile</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Kapha Dosha Card */}
                                <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-xl p-6 shadow-md">
                                    <h4 className="text-xl font-bold text-yellow-800 mb-2">Kapha Dosha</h4>
                                    <p className="text-yellow-600 font-medium mb-4">Earth & Water Elements</p>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h5 className="font-semibold text-yellow-700 mb-1">Physical traits:</h5>
                                            <p className="text-yellow-600 text-sm">Solid, strong build, oily skin, thick hair</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-yellow-700 mb-1">Mental traits:</h5>
                                            <p className="text-yellow-600 text-sm">Calm, loyal, methodical, compassionate</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-yellow-700 mb-1">Imbalance signs:</h5>
                                            <p className="text-yellow-600 text-sm">Weight gain, congestion, lethargy, water retention</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-yellow-700 mb-1">Balancing herbs:</h5>
                                            <p className="text-yellow-600 text-sm">Turmeric, Black Pepper, Ginger, Thyme</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'herbs' && (
                        <div className="animate-fadeIn">
                            <h3 className="text-2xl font-bold text-green-800 mb-8 text-center">Ayurvedic Herbs</h3>
                            <p className="text-green-700 mb-10 text-center max-w-3xl mx-auto">
                                Ayurvedic herbs are a cornerstone of traditional Ayurvedic medicine. Each herb has specific properties that can help balance certain doshas and address various health concerns. Here are some of the most important Ayurvedic herbs and their traditional uses.
                            </p>
                            
                            {/* Adaptogens Section */}
                            <div className="mb-12">
                                <h4 className="text-xl font-bold text-green-800 mb-6 pb-2 border-b-2 border-green-200">Adaptogens</h4>
                                <p className="text-green-700 mb-6">
                                    Adaptogens help the body resist physical, chemical, and biological stressors.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    {/* Ashwagandha Card */}
                                    <div className="bg-gradient-to-b from-amber-50 to-amber-100 rounded-xl p-6 shadow-md">
                                        <h5 className="text-lg font-bold text-amber-800 mb-2">Ashwagandha (Withania somnifera)</h5>
                                        <p className="text-amber-700 text-sm mb-4">
                                            Known as "Indian Ginseng," it helps reduce stress and anxiety, improves cognitive function, and supports immune health. Balances Vata and Kapha.
                                        </p>
                                    </div>
                                    
                                    {/* Holy Basil Card */}
                                    <div className="bg-gradient-to-b from-green-50 to-green-100 rounded-xl p-6 shadow-md">
                                        <h5 className="text-lg font-bold text-green-800 mb-2">Holy Basil (Tulsi)</h5>
                                        <p className="text-green-700 text-sm mb-4">
                                            Sacred plant that supports respiratory health, reduces stress, and enhances immunity. Balances all three doshas.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Digestive Herbs Section */}
                            <div className="mb-12">
                                <h4 className="text-xl font-bold text-green-800 mb-6 pb-2 border-b-2 border-green-200">Digestive Herbs</h4>
                                <p className="text-green-700 mb-6">
                                    These herbs support digestion, which is considered the foundation of health in Ayurveda.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    {/* Triphala Card */}
                                    <div className="bg-gradient-to-b from-purple-50 to-purple-100 rounded-xl p-6 shadow-md">
                                        <h5 className="text-lg font-bold text-purple-800 mb-2">Triphala</h5>
                                        <p className="text-purple-700 text-sm mb-4">
                                            A combination of three fruits (Amalaki, Bibhitaki, and Haritaki) that gently cleanses the digestive tract and supports regular elimination. Balances all three doshas.
                                        </p>
                                    </div>
                                    
                                    {/* Ginger Card */}
                                    <div className="bg-gradient-to-b from-orange-50 to-orange-100 rounded-xl p-6 shadow-md">
                                        <h5 className="text-lg font-bold text-orange-800 mb-2">Ginger (Zingiber officinale)</h5>
                                        <p className="text-orange-700 text-sm mb-4">
                                            Warming herb that stimulates digestion, reduces nausea, and supports circulation. Balances Vata and Kapha.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Anti-inflammatory Herbs Section */}
                            <div>
                                <h4 className="text-xl font-bold text-green-800 mb-6 pb-2 border-b-2 border-green-200">Anti-inflammatory Herbs</h4>
                                <p className="text-green-700 mb-6">
                                    These herbs help reduce inflammation and support overall health.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Turmeric Card */}
                                    <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-xl p-6 shadow-md">
                                        <h5 className="text-lg font-bold text-yellow-800 mb-2">Turmeric (Curcuma longa)</h5>
                                        <p className="text-yellow-700 text-sm mb-4">
                                            Powerful anti-inflammatory herb that supports joint health, digestion, and skin health. Balances all three doshas.
                                        </p>
                                    </div>
                                    
                                    {/* Boswellia Card */}
                                    <div className="bg-gradient-to-b from-teal-50 to-teal-100 rounded-xl p-6 shadow-md">
                                        <h5 className="text-lg font-bold text-teal-800 mb-2">Boswellia (Boswellia serrata)</h5>
                                        <p className="text-teal-700 text-sm mb-4">
                                            Also known as Indian Frankincense, it reduces inflammation and supports joint health. Particularly effective for Vata-related joint issues.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'practices' && (
                        <div className="animate-fadeIn">
                            <h3 className="text-2xl font-bold text-green-800 mb-8 text-center">Ayurvedic Practices</h3>
                            <p className="text-green-700 mb-10 text-center max-w-3xl mx-auto">
                                Ayurveda is a comprehensive system that includes not just herbs but also lifestyle practices, dietary guidelines, and therapeutic treatments. These practices are designed to maintain balance and prevent disease.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* Daily Routines Card */}
                                <div className="bg-gradient-to-b from-green-50 to-green-100 rounded-xl p-6 shadow-md">
                                    <h4 className="text-xl font-bold text-green-800 mb-4">Daily Routines (Dinacharya)</h4>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h5 className="font-semibold text-green-700 mb-1">Morning practices:</h5>
                                            <p className="text-green-600 text-sm">Tongue scraping, oil pulling, self-massage (abhyanga)</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-green-700 mb-1">Meal timing:</h5>
                                            <p className="text-green-600 text-sm">Eating main meal at midday when digestion is strongest</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-green-700 mb-1">Evening practices:</h5>
                                            <p className="text-green-600 text-sm">Early dinner, meditation, early bedtime</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Seasonal Routines Card */}
                                <div className="bg-gradient-to-b from-teal-50 to-teal-100 rounded-xl p-6 shadow-md">
                                    <h4 className="text-xl font-bold text-teal-800 mb-4">Seasonal Routines (Ritucharya)</h4>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h5 className="font-semibold text-teal-700 mb-1">Spring:</h5>
                                            <p className="text-teal-600 text-sm">Detoxification, lighter diet, reducing Kapha</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-teal-700 mb-1">Summer:</h5>
                                            <p className="text-teal-600 text-sm">Cooling foods and herbs, reducing Pitta</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-teal-700 mb-1">Fall/Winter:</h5>
                                            <p className="text-teal-600 text-sm">Warming foods and herbs, reducing Vata</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Therapeutic Treatments Card */}
                                <div className="bg-gradient-to-b from-amber-50 to-amber-100 rounded-xl p-6 shadow-md">
                                    <h4 className="text-xl font-bold text-amber-800 mb-4">Therapeutic Treatments</h4>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h5 className="font-semibold text-amber-700 mb-1">Panchakarma:</h5>
                                            <p className="text-amber-600 text-sm">Five-fold detoxification therapy</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-amber-700 mb-1">Shirodhara:</h5>
                                            <p className="text-amber-600 text-sm">Warm oil poured over forehead for deep relaxation</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-amber-700 mb-1">Nasya:</h5>
                                            <p className="text-amber-600 text-sm">Nasal administration of herbal oils</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-amber-700 mb-1">Abhyanga:</h5>
                                            <p className="text-amber-600 text-sm">Warm oil massage with specific strokes</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Dietary Guidelines Card */}
                                <div className="bg-gradient-to-b from-purple-50 to-purple-100 rounded-xl p-6 shadow-md">
                                    <h4 className="text-xl font-bold text-purple-800 mb-4">Dietary Guidelines</h4>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h5 className="font-semibold text-purple-700 mb-1">Six tastes:</h5>
                                            <p className="text-purple-600 text-sm">Including sweet, sour, salty, pungent, bitter, and astringent in meals</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-purple-700 mb-1">Food combinations:</h5>
                                            <p className="text-purple-600 text-sm">Avoiding incompatible food combinations</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-purple-700 mb-1">Mindful eating:</h5>
                                            <p className="text-purple-600 text-sm">Eating in a calm environment with awareness</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-semibold text-purple-700 mb-1">Dosha-specific diets:</h5>
                                            <p className="text-purple-600 text-sm">Foods that balance your dominant dosha</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Important Note Section */}
                <div className="max-w-6xl mx-auto bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-lg font-medium text-yellow-800 mb-2">Important Note on Ayurvedic Practices</h3>
                    <p className="text-gray-700">
                        The information provided here is for educational purposes only. Ayurvedic herbs and practices should be used under the guidance of a qualified Ayurvedic practitioner, especially if you have existing health conditions or are taking medications. Always consult with your healthcare provider before starting any new health regimen.
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Page;