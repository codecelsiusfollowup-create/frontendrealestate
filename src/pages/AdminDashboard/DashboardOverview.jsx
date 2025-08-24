"use client";

import React, { useState } from "react";
import {
    ArrowUp, ArrowDown, Flame, TrendingUp, PieChart, Lightbulb, PlusCircle,
    Edit,
    CheckCircle,
    Calendar,
    UserPlus,
} from "lucide-react";
const DashboardOverview = () => {
    // Tabs ke liye state
    const [propertyTab, setPropertyTab] = useState("statistics");
    const [marketTab, setMarketTab] = useState("price");
    const [leadsTab, setLeadsTab] = useState("stats");

    const activities = [
        {
            id: 1,
            icon: <PlusCircle className="w-4 h-4 text-green-600" />,
            user: "Rajesh Kumar",
            action: "added new property",
            target: "3BHK Apartment in Andheri",
            time: "2 minutes ago",
        },
        {
            id: 2,
            icon: <Edit className="w-4 h-4 text-blue-600" />,
            user: "Priya Sharma",
            action: "updated lead status",
            target: "Lead #1245",
            time: "15 minutes ago",
        },
        {
            id: 3,
            icon: <CheckCircle className="w-4 h-4 text-green-600" />,
            user: "Amit Patel",
            action: "completed transaction",
            target: "₹85L - Villa Sale",
            time: "1 hour ago",
        },
        {
            id: 4,
            icon: <Calendar className="w-4 h-4 text-purple-600" />,
            user: "Sneha Reddy",
            action: "scheduled site visit",
            target: "Residential Plot in Gachibowli",
            time: "2 hours ago",
        },
        {
            id: 5,
            icon: <UserPlus className="w-4 h-4 text-blue-600" />,
            user: "Vikram Singh",
            action: "added new customer",
            target: "Rohit Agarwal",
            time: "3 hours ago",
        },
    ];

    const properties = [
        {
            title: "3BHK Luxury Apartment",
            location: "Bandra West, Mumbai",
            owner: "Rajesh Kumar",
            price: "₹2.5 Cr",
            status: "available",
            statusColor: "bg-green-100 text-green-800",
            image:
                "https://readdy.ai/api/search-image?query=Modern%20luxury%20apartment%20building%20exterior%20with%20glass%20facade%2C%20contemporary%20architecture%2C%20urban%20residential%20complex%2C%20beautiful%20landscaping%20and%20clear%20blue%20sky%20background&width=300&height=200&seq=prop1&orientation=landscape",
        },
        {
            title: "Independent Villa",
            location: "Jubilee Hills, Hyderabad",
            owner: "Sneha Reddy",
            price: "₹4.2 Cr",
            status: "sold",
            statusColor: "bg-red-100 text-red-800",
            image:
                "https://readdy.ai/api/search-image?query=Elegant%20independent%20villa%20with%20modern%20architecture%2C%20manicured%20garden%2C%20luxury%20residential%20property%20with%20contemporary%20design%2C%20beautiful%20landscaping%20and%20natural%20lighting&width=300&height=200&seq=prop2&orientation=landscape",
        },
        {
            title: "Commercial Plot",
            location: "Cyber City, Gurgaon",
            owner: "Priya Sharma",
            price: "₹8.5 Cr",
            status: "pending",
            statusColor: "bg-yellow-100 text-yellow-800",
            image:
                "https://readdy.ai/api/search-image?query=Commercial%20plot%20development%20site%20with%20modern%20office%20buildings%20in%20background%2C%20urban%20commercial%20real%20estate%2C%20business%20district%20with%20contemporary%20architecture%20and%20infrastructure&width=300&height=200&seq=prop3&orientation=landscape",
        },
    ];

    const stats = [
        { label: "New", value: 45, change: "++12", color: "bg-blue-500" },
        { label: "In Progress", value: 32, change: "++5", color: "bg-yellow-500" },
        { label: "Qualified", value: 28, change: "++8", color: "bg-green-500" },
        { label: "Closed", value: 15, change: "++3", color: "bg-gray-500" },
    ];

    const leads = [
        {
            name: "Rahul Agarwal",
            priority: "High",
            priorityColor: "bg-red-100 text-red-800",
            property: "3BHK Apartment in Andheri West",
            price: "₹80L - ₹1.2Cr",
            by: "Priya Sharma",
            time: "2 hours ago",
        },
        {
            name: "Kavita Singh",
            priority: "Medium",
            priorityColor: "bg-yellow-100 text-yellow-800",
            property: "Independent Villa in Jubilee Hills",
            price: "₹2Cr - ₹3Cr",
            by: "Rajesh Kumar",
            time: "4 hours ago",
        },
        {
            name: "Suresh Patel",
            priority: "High",
            priorityColor: "bg-red-100 text-red-800",
            property: "Commercial Space in BKC Mumbai",
            price: "₹5Cr+",
            by: "Amit Patel",
            time: "6 hours ago",
        },
    ];

    const areas = [
        {
            name: "Andheri West",
            price: "₹18,500",
            change: "+5.2%",
            isPositive: true,
            properties: 145,
        },
        {
            name: "Bandra East",
            price: "₹22,000",
            change: "+3.8%",
            isPositive: true,
            properties: 89,
        },
        {
            name: "Powai",
            price: "₹16,200",
            change: "-1.2%",
            isPositive: false,
            properties: 234,
        },
        {
            name: "Goregaon West",
            price: "₹14,800",
            change: "+2.1%",
            isPositive: true,
            properties: 167,
        },
        {
            name: "Thane West",
            price: "₹12,500",
            change: "+4.5%",
            isPositive: true,
            properties: 198,
        },
    ];
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 py-6">
            {/* Left Section */}
            <div className="xl:col-span-2 space-y-6">
                {/* Property Overview */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Property Overview
                        </h3>
                        <div className="flex bg-gray-100 rounded-full p-1">
                            <button
                                onClick={() => setPropertyTab("statistics")}
                                className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap ${propertyTab === "statistics"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                Statistics
                            </button>
                            <button
                                onClick={() => setPropertyTab("recent")}
                                className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap ${propertyTab === "recent"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                Recent
                            </button>
                        </div>
                    </div>

                    {/* Property Stats */}
                    {propertyTab === "statistics" && (
                        <div className="space-y-4">
                            {[
                                { label: "Apartments", value: 456, percent: "36.6%", color: "bg-blue-500" },
                                { label: "Villas", value: 234, percent: "18.8%", color: "bg-green-500" },
                                { label: "Plots", value: 345, percent: "27.7%", color: "bg-purple-500" },
                                { label: "Commercial", value: 210, percent: "16.9%", color: "bg-orange-500" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                        <span className="text-sm font-medium text-gray-700">
                                            {item.label}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-gray-900">
                                            {item.value}
                                        </div>
                                        <div className="text-xs text-gray-500">{item.percent}</div>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-700">Total Properties</span>
                                    <span className="font-semibold text-gray-900">1,245</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Property Recent */}
                    {propertyTab === "recent" && (
                        <div className="space-y-4">
                            {properties.map((prop, i) => (
                                <div
                                    key={i}
                                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
                                >
                                    <img
                                        src={prop.image}
                                        alt={prop.title}
                                        className="w-16 h-12 rounded-lg object-cover object-top"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 truncate">
                                            {prop.title}
                                        </h4>
                                        <p className="text-xs text-gray-500">{prop.location}</p>
                                        <p className="text-xs text-gray-600">by {prop.owner}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">{prop.price}</p>
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${prop.statusColor}`}
                                        >
                                            {prop.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Market Analysis */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Market Analysis
                        </h3>
                        <div className="flex bg-gray-100 rounded-full p-1">
                            <button
                                onClick={() => setMarketTab("price")}
                                className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap ${marketTab === "price"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                Price Trends
                            </button>
                            <button
                                onClick={() => setMarketTab("insights")}
                                className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap ${marketTab === "insights"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                Insights
                            </button>
                        </div>
                    </div>

                    {/* Market Price Trends */}
                    {marketTab === "price" && (
                        <div className="space-y-3">
                            {/* Header */}
                            <div className="grid grid-cols-4 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider pb-2 border-b border-gray-200">
                                <span>Area</span>
                                <span>Avg Price/sqft</span>
                                <span>Change</span>
                                <span>Properties</span>
                            </div>

                            {/* Rows */}
                            {areas.map((area, i) => (
                                <div
                                    key={i}
                                    className="grid grid-cols-4 gap-4 items-center py-2 hover:bg-gray-50 rounded"
                                >
                                    <div className="font-medium text-gray-900 text-sm">{area.name}</div>
                                    <div className="text-sm text-gray-700">{area.price}</div>
                                    <div
                                        className={`text-sm font-medium flex items-center space-x-1 ${area.isPositive ? "text-green-600" : "text-red-600"
                                            }`}
                                    >
                                        {area.isPositive ? (
                                            <ArrowUp className="w-3 h-3" />
                                        ) : (
                                            <ArrowDown className="w-3 h-3" />
                                        )}
                                        <span>{area.change}</span>
                                    </div>
                                    <div className="text-sm text-gray-600">{area.properties}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Market Insights */}
                    {marketTab === "insights" && (
                        <div className="space-y-4">
                            {/* High Demand Areas */}
                            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-red-500">
                                    <Flame className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-900">High Demand Areas</h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Andheri & Bandra leading in enquiries
                                    </p>
                                </div>
                            </div>

                            {/* Price Appreciation */}
                            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-500">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-900">Price Appreciation</h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        4.2% average growth this quarter
                                    </p>
                                </div>
                            </div>

                            {/* Inventory Status */}
                            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-500">
                                    <PieChart className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-900">Inventory Status</h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        78% properties sold this month
                                    </p>
                                </div>
                            </div>

                            {/* Market Recommendation */}
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Lightbulb className="w-5 h-5 text-blue-600" />
                                    <h4 className="text-sm font-medium text-blue-900">
                                        Market Recommendation
                                    </h4>
                                </div>
                                <p className="text-sm text-blue-800">
                                    Focus on Andheri & Thane areas for maximum ROI. Current market
                                    conditions favor residential properties over commercial.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
                {/* Leads Overview */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Leads Overview</h3>
                        <div className="flex bg-gray-100 rounded-full p-1">
                            <button
                                onClick={() => setLeadsTab("stats")}
                                className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap ${leadsTab === "stats"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                Stats
                            </button>
                            <button
                                onClick={() => setLeadsTab("recent")}
                                className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap ${leadsTab === "recent"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                                    }`}
                            >
                                Recent
                            </button>
                        </div>
                    </div>

                    {/* Leads Stats */}
                    {leadsTab === "stats" && (
                        <div className="space-y-4">
                            {stats.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                        <span className="text-sm font-medium text-gray-700">
                                            {item.label}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-gray-900">
                                            {item.value}
                                        </div>
                                        <div className="text-xs text-green-600">{item.change}</div>
                                    </div>
                                </div>
                            ))}

                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-700">Total Leads</span>
                                    <span className="font-semibold text-gray-900">120</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Conversion Rate</span>
                                    <span className="text-green-600">68%</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Leads Recent */}
                    {leadsTab === "recent" && (
                        <div className="space-y-3">
                            {leads.map((lead, i) => (
                                <div
                                    key={i}
                                    className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <h4 className="text-sm font-medium text-gray-900">
                                                    {lead.name}
                                                </h4>
                                                <span
                                                    className={`px-2 py-1 text-xs font-medium rounded-full ${lead.priorityColor}`}
                                                >
                                                    {lead.priority}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-600">{lead.property}</p>
                                            <p className="text-xs text-gray-500">{lead.price}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-xs text-gray-500">by {lead.by}</span>
                                                <span className="text-xs text-gray-400">{lead.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium py-2 cursor-pointer whitespace-nowrap">
                                View All Leads
                            </button>
                        </div>
                    )}
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer whitespace-nowrap">
                            View All
                        </button>
                    </div>
                    <div className="space-y-4">
                        {activities.map((activity) => (
                            <div key={activity.id} className="flex items-start space-x-3">
                                {/* Icon */}
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                    {activity.icon}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900">
                                        <span className="font-medium">{activity.user}</span>{" "}
                                        <span className="text-gray-600">{activity.action}</span>{" "}
                                        <span className="font-medium">{activity.target}</span>
                                    </p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;