import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { supabase } from '../api/supabaseClient'; // Import supabase
import '../index.css';
import { jsPDF } from 'jspdf';

const Reports = () => {
    const fetchProductsData = async () => {
        const { data, error } = await supabase.from('products').select('*');
        if (error) {
            console.error('Error fetching products:', error);
            return [];
        }
        return data;
    };

    const fetchSuppliersData = async () => {
        const { data, error } = await supabase
            .from('suppliers')
            .select(`
                id,
                supplier_name,
                location,
                email,
                created_at,
                products (product_name)
            `);

        if (error) {
            console.error('Error fetching suppliers:', error);
            return [];
        }

        // Format the suppliers data
        return data.map(supplier => ({
            id: supplier.id,
            supplier_name: supplier.supplier_name,
            location: supplier.location,
            email: supplier.email,
            created_at: new Date(supplier.created_at).toLocaleString(),
            products: supplier.products.map(product => product.product_name).join(', ') || 'No products available',
        }));
    };
    const fetchPurchaseOrdersData = async () => {
        const { data, error } = await supabase
            .from('purchase_orders')
            .select('*');
    
        if (error) {
            console.error('Error fetching purchase orders:', error);
            return [];
        }
    
        return data;
    };
    const generatePurchaseOrdersExcel = async () => {
        const orders = await fetchPurchaseOrdersData();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Purchase Orders Report');

        // Add headers
        worksheet.columns = [
            { header: 'SL No.', key: 'sl_no', width: 10 },
            { header: 'Product', key: 'product', width: 30 },
            { header: 'Quantity Ordered', key: 'quantity_ordered', width: 20 },
            { header: 'Supplier', key: 'supplier', width: 30 },
            { header: 'Status', key: 'status', width: 15 },
            { header: 'Ordered By', key: 'ordered_by', width: 25 },
            { header: 'Created Date', key: 'created_date', width: 25 },
            { header: 'Delivery History', key: 'delivery_history', width: 40 },
        ];

        // Add rows with purchase order data
        orders.forEach((order, index) => {
            worksheet.addRow({
                sl_no: index + 1,
                product: order.product,
                quantity_ordered: order.quantity,
                supplier: order.supplier,
                status: order.status,
                ordered_by: order.ordered_by,
                created_date: new Date(order.created_date).toLocaleString(),
                delivery_history: order.delivery_history || 'N/A',
            });
        });

        // Generate the Excel file and download it
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'purchase_orders_report.xlsx');
    };

    // Generate PDF for Purchase Orders
    const generatePurchaseOrdersPDF = async () => {
        const orders = await fetchPurchaseOrdersData();

        const doc = new jsPDF();
        doc.setFontSize(10);
        doc.text('Purchase Orders Report', 20, 20);

        const headers = ['SNo.', 'Product', 'Quantity', 'Supplier', 'Status', 'OrderedBy', 'Created Date'];
        const data = orders.map((order, index) => [
            index + 1,
            order.product,
            order.quantity,
            order.supplier,
            order.status,
            order.ordered_by,
            new Date(order.created_date).toLocaleString(),
            
        ]);

        const tableColumnWidths = [10, 34, 20, 30, 18, 20, 40];
        let startY = 30;

        // Add headers with borders
        headers.forEach((header, index) => {
            const x = 20 + tableColumnWidths.slice(0, index).reduce((a, b) => a + b, 0);
            doc.rect(x, startY, tableColumnWidths[index], 10); // Draw header border
            doc.text(header, x + 2, startY + 7); // Add header text
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
        doc.save('purchase_orders_report.pdf');
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

    const generateSuppliersExcel = async () => {
        const suppliers = await fetchSuppliersData();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Suppliers Report');

        // Add headers
        worksheet.columns = [
            { header: 'Supplier ID', key: 'id', width: 15 },
            { header: 'Supplier Name', key: 'supplier_name', width: 20 },
            { header: 'Location', key: 'location', width: 20 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Products', key: 'products', width: 30 },
            { header: 'Created At', key: 'created_at', width: 20 },
        ];

        // Add rows with supplier data
        suppliers.forEach((supplier) => {
            worksheet.addRow({
                id: supplier.id,
                supplier_name: supplier.supplier_name,
                location: supplier.location,
                email: supplier.email,
                products: supplier.products,
                created_at: supplier.created_at,
            });
        });

        // Generate the Excel file and download it
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'suppliers_report.xlsx');
    };

    const generateSuppliersPDF = async () => {
        const suppliers = await fetchSuppliersData();

        const doc = new jsPDF();
        doc.setFontSize(10);
        doc.text('Suppliers Report', 20, 20);
        
        const headers = ['SID', 'Supplier Name', 'Location', 'Email', 'Products', 'Created At'];
        const data = suppliers.map((supplier) => [
            supplier.id,
            supplier.supplier_name,
            supplier.location,
            supplier.email,
            supplier.products,
            supplier.created_at,
        ]);

        const tableColumnWidths = [10, 30, 30, 35, 38, 38];
        let startY = 40;
        let startX = 40;

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
        doc.save('suppliers_report.pdf');
    };
    //BALANCE REPORT
    const fetchBalanceReportData = async () => {
        // Fetch all products
        const { data: products, error: productsError } = await supabase.from('products').select('product_name, quantity');
        if (productsError) {
            console.error('Error fetching products:', productsError);
            return [];
        }
    
        // Fetch all purchase orders
        const { data: orders, error: ordersError } = await supabase.from('purchase_orders').select('product, quantity');
        if (ordersError) {
            console.error('Error fetching purchase orders:', ordersError);
            return [];
        }
    
        // Calculate total orders per product
        const ordersMap = {};
        orders.forEach(order => {
            if (ordersMap[order.product]) {
                ordersMap[order.product] += order.quantity;
            } else {
                ordersMap[order.product] = order.quantity;
            }
        });
    
        // Merge products with orders to calculate balance
        const balanceReport = products.map(product => {
            const ordersPlaced = ordersMap[product.product_name] || 0;
            const balance = product.quantity - ordersPlaced;
            return {
                product_name: product.product_name,
                total_quantity: product.quantity,
                orders_placed: ordersPlaced,
                balance_stocks_left: balance >= 0 ? balance : '  Out of stock', // Display "Out of stock" if balance is negative
            };
        });
    
        return balanceReport;
    };
//EXCEL REPORT FOR BALANCE
const generateBalanceReportExcel = async () => {
    const balanceReport = await fetchBalanceReportData();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Balance Report');

    // Add headers
    worksheet.columns = [
        { header: 'Product Name', key: 'product_name', width: 30 },
        { header: 'Total Quantity', key: 'total_quantity', width: 20 },
        { header: 'Orders Placed', key: 'orders_placed', width: 20 },
        { header: 'Balance Stocks Left', key: 'balance_stocks_left', width: 25 },
    ];

    // Add rows
    balanceReport.forEach((item) => {
        worksheet.addRow(item);
    });

    // Generate the Excel file and download it
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'balance_report.xlsx');
};
//PDF FOR BALANCE
const generateBalanceReportPDF = async () => {
    const balanceReport = await fetchBalanceReportData();

    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Balance Report', 14, 20);

    const headers = ['Product Name', 'Total Quantity', 'Orders Placed', 'Balance Stocks Left'];
    const data = balanceReport.map((item) => [
        item.product_name,
        item.total_quantity,
        item.orders_placed,
        item.balance_stocks_left,
    ]);

    const tableColumnWidths = [60, 40, 40, 50];
    let startY = 30;

    // Add headers with borders
    headers.forEach((header, index) => {
        const x = 14 + tableColumnWidths.slice(0, index).reduce((a, b) => a + b, 0);
        doc.rect(x, startY, tableColumnWidths[index], 10); // Draw header border
        doc.text(header, x + 2, startY + 7); // Add header text
    });

    // Add rows with borders
    data.forEach((row) => {
        startY += 10; // Move down for the next row
        row.forEach((cell, index) => {
            const x = 14 + tableColumnWidths.slice(0, index).reduce((a, b) => a + b, 0);
            doc.rect(x, startY, tableColumnWidths[index], 10); // Draw cell border
            doc.text(cell.toString(), x + 2, startY + 7); // Add cell text
        });
    });

    // Save the PDF
    doc.save('balance_report.pdf');
};


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
                        onClick={generateSuppliersExcel}>EXCEL</button>
                        <button className="pdf-btn bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={generateSuppliersPDF}>PDF</button>
                    </div>
                </div>
            </div>
            <div className="report-row flex flex-wrap justify-between gap-4">
                <div className="report-box w-full sm:w-[48%] bg-white p-5 rounded-lg shadow-lg hover:scale-105 transition-transform">
                    <p className="mb-4">Balance Report</p>
                    <div className="btn-group flex justify-end">
                        <button className="excel-btn bg-blue-900 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                        onClick={generateBalanceReportExcel}
                        >EXCEL</button>
                        <button className="pdf-btn bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={generateBalanceReportPDF}
                        >PDF</button>
                    </div>
                </div>
                <div className="report-box w-full sm:w-[48%] bg-white p-5 rounded-lg shadow-lg hover:scale-105 transition-transform"
                onClick={generateBalanceReportPDF}>
                    <p className="mb-4">Export Purchase Orders</p>
                    <div className="btn-group flex justify-end">
                        <button className="excel-btn bg-blue-900 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                        onClick={generatePurchaseOrdersExcel}>EXCEL</button>
                        <button className="pdf-btn bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={generatePurchaseOrdersPDF}>PDF</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
