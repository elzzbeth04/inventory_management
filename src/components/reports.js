import React from 'react';
import '../index.css';

const Reports = () => {
    return (
        <div className="reports-container p-6">
            <h2 className="text-2xl font-bold mb-6">Reports</h2>
            <div className="report-row flex flex-wrap justify-between gap-4 mb-6">
                <div className="report-box w-full sm:w-[48%] bg-white p-5 rounded-lg shadow-lg hover:scale-105 transition-transform">
                    <p className="mb-4">Export Products</p>
                    <div className="btn-group flex justify-end">
                        <button className="excel-btn bg-blue-900 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700">EXCEL</button>
                        <button className="pdf-btn bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700">PDF</button>
                    </div>
                </div>
                <div className="report-box w-full sm:w-[48%] bg-white p-5 rounded-lg shadow-lg hover:scale-105 transition-transform">
                    <p className="mb-4">Export Suppliers</p>
                    <div className="btn-group flex justify-end">
                        <button className="excel-btn bg-blue-900 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700">EXCEL</button>
                        <button className="pdf-btn bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700">PDF</button>
                    </div>
                </div>
            </div>
            <div className="report-row flex flex-wrap justify-between gap-4">
                <div className="report-box w-full sm:w-[48%] bg-white p-5 rounded-lg shadow-lg hover:scale-105 transition-transform">
                    <p className="mb-4">Export Deliveries</p>
                    <div className="btn-group flex justify-end">
                        <button className="excel-btn bg-blue-900 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700">EXCEL</button>
                        <button className="pdf-btn bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700">PDF</button>
                    </div>
                </div>
                <div className="report-box w-full sm:w-[48%] bg-white p-5 rounded-lg shadow-lg hover:scale-105 transition-transform">
                    <p className="mb-4">Export Purchase Orders</p>
                    <div className="btn-group flex justify-end">
                        <button className="excel-btn bg-blue-900 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700">EXCEL</button>
                        <button className="pdf-btn bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700">PDF</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
