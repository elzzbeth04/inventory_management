import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { supabase } from '../api/supabaseClient'; // Import supabase
import '../index.css';
import { jsPDF } from 'jspdf';

const Reports = () => {

    //fetching the data from supabase
    const fetchProductsData = async () => {
        const { data, error } = await supabase.from('products').select('*');
        if (error) {
            console.error('Error fetching products:', error);
            return [];
        }
        return data;
    };
    const fetchSuppliersData = async () => {
        const { data, error } = await supabase.from('suppliers').select('*');
        if (error) {
            console.error('Error fetching suppliers:', error);
            return [];
        }
        return data;
    };

    //definig the functions
    const generateExcelSuppliers = async () => {
        const suppliers = await fetchSuppliersData();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Suppliers Report');

        // Add headers
        worksheet.columns = [
            { header: 'Supplier Name', key: 'supplier_name', width: 20 },
            { header: 'Location', key: 'location', width: 20 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Created At', key: 'created_at', width: 20 },
        ];

        // Add rows with supplier data
        suppliers.forEach((supplier) => {
            worksheet.addRow({
                supplier_name: supplier.supplier_name,
                location: supplier.location,
                email: supplier.email,
                created_at: new Date(supplier.created_at).toLocaleString(),
            });
        });

        // Generate the Excel file and download it
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'suppliers_report.xlsx');
    };

    const generateExcel = async () => {
        const products = await fetchProductsData();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Products Report');

        // Add headers
        worksheet.columns = [
            { header: 'Product Name', key: 'product_name', width: 20 },
            { header: 'Supplier ID', key: 'supplier_id', width: 15 },
            { header: 'Quantity', key: 'quantity', width: 10 },
            { header: 'Description', key: 'description', width: 30 },
            { header: 'Created At', key: 'created_at', width: 20 },
        ];

        // Add rows with product data
        products.forEach((product) => {
            worksheet.addRow({
                product_name: product.product_name,
                supplier_id: product.supplier_id,
                quantity: product.quantity,
                description: product.description,
                created_at: new Date(product.created_at).toLocaleString(),
            });
        });

        // Generate the Excel file and download it
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'products_report.xlsx');
    };
    const generatePDF = async () => {
        const products = await fetchProductsData();

        const doc = new jsPDF();
        doc.setFontSize(10);
        doc.text('Products Report', 20, 20);
        
        const headers = ['Product Name', 'Supplier ID', 'Quantity', 'Description', 'Created At'];
        const data = products.map((product) => [
            product.product_name,
            product.supplier_id,
            product.quantity,
            product.description,
            new Date(product.created_at).toLocaleString(),
        ]);

        const tableColumnWidths = [50, 30, 20, 30, 50];
        let startY = 40;

        // Add headers
        headers.forEach((header, index) => {
            const x = 20 + tableColumnWidths.slice(0, index).reduce((a, b) => a + b, 0);
            doc.rect(x, startY - 10, tableColumnWidths[index], 10); // Draw header border
            doc.text(header, x + 2, startY - 5); // Add header text
        });
    
        // Add rows with borders
        data.forEach((row) => {
            startY += 10; // Move down for the next row
            row.forEach((cell, index) => {
                const x = 20 + tableColumnWidths.slice(0, index).reduce((a, b) => a + b, 0);
                doc.rect(x, startY, tableColumnWidths[index], 10); // Draw cell border
                doc.text(cell.toString(), x + 2, startY + 7); // Add cell text
            });
        });

        // Save the PDF
        doc.save('products_report.pdf');
    };
    // const generatesupplierPDF = async () => {
    //     const suppliers = await fetchSuppliersData();

    //     const doc = new jsPDF();
    //     doc.setFontSize(10);
    //     doc.text('Products Report', 20, 20);
        
    //     const headers = ['Supplier Name', 'Location', 'Email', 'Products', 'Created At'];
    //     const data = suppliers.map((product) => [
    //         product.product_name,
    //         product.supplier_id,
    //         product.quantity,
    //         product.description,
    //         new Date(product.created_at).toLocaleString(),
    //     ]);

    //     const tableColumnWidths = [50, 30, 20, 30, 50];
    //     let startY = 40;

    //     // Add headers
    //     headers.forEach((header, index) => {
    //         const x = 20 + tableColumnWidths.slice(0, index).reduce((a, b) => a + b, 0);
    //         doc.rect(x, startY - 10, tableColumnWidths[index], 10); // Draw header border
    //         doc.text(header, x + 2, startY - 5); // Add header text
    //     });
    
    //     // Add rows with borders
    //     data.forEach((row) => {
    //         startY += 10; // Move down for the next row
    //         row.forEach((cell, index) => {
    //             const x = 20 + tableColumnWidths.slice(0, index).reduce((a, b) => a + b, 0);
    //             doc.rect(x, startY, tableColumnWidths[index], 10); // Draw cell border
    //             doc.text(cell.toString(), x + 2, startY + 7); // Add cell text
    //         });
    //     });

    //     // Save the PDF
    //     doc.save('products_report.pdf');
    // };


    return (
        <div className="reports-container p-6">
            <h2 className="text-2xl font-bold mb-6">Reports</h2>
            <div className="report-row flex flex-wrap justify-between gap-4 mb-6">
                <div className="report-box w-full sm:w-[48%] bg-white p-5 rounded-lg shadow-lg hover:scale-105 transition-transform">
                    <p className="mb-4"> Products Reports</p>
                    <div className="btn-group flex justify-end">
                        <button
                            className="excel-btn bg-blue-900 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                            onClick={generateExcel} // Add onClick handler
                        >
                            EXCEL
                        </button>
                        <button className="pdf-btn bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={generatePDF}
                        >
                            PDF</button>
                    </div>
                </div>
                <div className="report-box w-full sm:w-[48%] bg-white p-5 rounded-lg shadow-lg hover:scale-105 transition-transform">
                    <p className="mb-4"> Suppliers Report</p>
                    <div className="btn-group flex justify-end">
                        <button className="excel-btn bg-blue-900 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                        onClick={generateExcelSuppliers}>EXCEL</button>
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
