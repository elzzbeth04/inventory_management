// src/components/Reports.js
import React from 'react';
import '../styles.css';

const Reports = () => {
    return (
        <div className="reports-container p-6">
            <h2 className="text-2xl font-bold mb-6">Reports</h2>
            <div className="report-row flex flex-wrap justify-between gap-4 mb-6">
            <div className="report-box w-full sm:w-[48%] bg-white p-5 rounded-lg shadow-[0px_4px_10px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform">
                    <p className="mb-4">Export Products</p>
                    <div className="btn-group flex justify-end">
                        <button className="excel-btn bg-blue-900 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700">EXCEL</button>
                        <button className="pdf-btn bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700">PDF</button>
                    </div>
                </div>
                <div className="report-box w-full sm:w-[48%] bg-white p-5 rounded-lg shadow-[0px_4px_10px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform">
                    <p className="mb-4">Export Suppliers</p>
                    <div className="btn-group flex justify-end">
                        <button className="excel-btn bg-blue-900 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700">EXCEL</button>
                        <button className="pdf-btn bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700">PDF</button>
                    </div>
                </div>
            </div>
            <div className="report-row flex flex-wrap justify-between gap-4">
                <div className="report-box w-full sm:w-[48%] bg-white p-5 rounded-lg shadow-md hover:scale-105 transition-transform">
                    <p className="mb-4">Export Deliveries</p>
                    <div className="btn-group flex justify-end">
                        <button className="excel-btn bg-blue-900 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700">EXCEL</button>
                        <button className="pdf-btn bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700">PDF</button>
                    </div>
                </div>
                <div className="report-box w-full sm:w-[48%] bg-white p-5 rounded-lg shadow-md hover:scale-105 transition-transform">
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
/*import React from 'react';
import '../styles.css'; 

const Reports = () => {
    return (
        <div className="reports-container">
            <h2>Reports</h2>
            <div className="report-row">
                <div className="report-box">
                    <p>Export Products</p>
                    <div className="btn-group">
                        <button className="excel-btn">EXCEL</button>
                        <button className="pdf-btn">PDF</button>
                    </div>
                </div>
                <div className="report-box">
                    <p>Export Suppliers</p>
                    <div className="btn-group">
                        <button className="excel-btn">EXCEL</button>
                        <button className="pdf-btn">PDF</button>
                    </div>
                </div>
            </div>
            <div className="report-row">
                <div className="report-box">
                    <p>Export Deliveries</p>
                    <div className="btn-group">
                        <button className="excel-btn">EXCEL</button>
                        <button className="pdf-btn">PDF</button>
                    </div>
                </div>
                <div className="report-box">
                    <p>Export Purchase Orders</p>
                    <div className="btn-group">
                        <button className="excel-btn">EXCEL</button>
                        <button className="pdf-btn">PDF</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;*/
