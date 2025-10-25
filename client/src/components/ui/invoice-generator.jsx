import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Printer, X, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';

const InvoiceGenerator = ({ order, isOpen, onClose }) => {
  const invoiceRef = useRef();

  if (!isOpen || !order) return null;

  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `INV-${year}${month}${day}-${random}`;
  };

  const calculateTotal = () => {
    return order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = (total) => {
    return Math.round(total * 0.18); // 18% GST
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const invoiceContent = invoiceRef.current.innerHTML;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${generateInvoiceNumber()}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .invoice-container { max-width: 800px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 30px; }
            .company-info { margin-bottom: 20px; }
            .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .items-table th { background-color: #f2f2f2; }
            .total-section { text-align: right; margin-top: 20px; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            ${invoiceContent}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownload = () => {
    const invoiceContent = invoiceRef.current.innerHTML;
    const blob = new Blob([`
      <html>
        <head>
          <title>Invoice - ${generateInvoiceNumber()}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .invoice-container { max-width: 800px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 30px; }
            .company-info { margin-bottom: 20px; }
            .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .items-table th { background-color: #f2f2f2; }
            .total-section { text-align: right; margin-top: 20px; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            ${invoiceContent}
          </div>
        </body>
      </html>
    `], { type: 'text/html' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${generateInvoiceNumber()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const subtotal = calculateTotal();
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Invoice
          </h2>
          <div className="flex space-x-2">
            <Button onClick={handlePrint} variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={onClose} variant="ghost" size="icon">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div ref={invoiceRef} className="invoice-content">
            {/* Company Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                Sri Raja Food Products
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Premium Cold Pressed Oils & Natural Products
              </p>
            </div>

            {/* Company Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">From:</h3>
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="font-medium">Sri Raja Food Products</p>
                  <p>123 Market Street, Elumathur</p>
                  <p>Tamil Nadu 600001, India</p>
                  <div className="flex items-center mt-2">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>info@rajafoodproducts.com</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Bill To:</h3>
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="font-medium">{order.deliveryAddress?.name || 'Customer'}</p>
                  <p>{order.deliveryAddress?.street || 'Address not provided'}</p>
                  <p>{order.deliveryAddress?.city}, {order.deliveryAddress?.state}</p>
                  <p>{order.deliveryAddress?.pincode}</p>
                  <div className="flex items-center mt-2">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{order.deliveryAddress?.phone || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Invoice Number</p>
                <p className="font-semibold text-gray-900 dark:text-white">{generateInvoiceNumber()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Invoice Date</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Order Status</p>
                <p className="font-semibold text-green-600 dark:text-green-400 capitalize">
                  {order.status}
                </p>
              </div>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Item</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">Qty</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right">Price</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{item.product.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.product.category}</p>
                        </div>
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                        {item.quantity}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right">
                        ₹{item.price}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right">
                        ₹{item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-2 border-b border-gray-300 dark:border-gray-600">
                  <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-300 dark:border-gray-600">
                  <span className="text-gray-700 dark:text-gray-300">GST (18%):</span>
                  <span className="font-medium">₹{tax}</span>
                </div>
                <div className="flex justify-between py-3 text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Total:</span>
                  <span className="text-teal-600 dark:text-teal-400">₹{total}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
              <p>Thank you for your business!</p>
              <p className="mt-2">
                For any queries, contact us at +91 98765 43210 or info@rajafoodproducts.com
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InvoiceGenerator;
