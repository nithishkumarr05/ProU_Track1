export const convertToCSV = (data, headers, fieldMap) => {
  if (!data || !data.length) return '';
  
  let csvContent = headers.join(',') + '\n';
  
  data.forEach(item => {
    const row = headers.map(header => {
      const field = fieldMap[header];
      let value = '';
      
      if (typeof field === 'function') {
        value = field(item);
      } else if (field.includes('.')) {
        const props = field.split('.');
        let propValue = item;
        for (const prop of props) {
          propValue = propValue ? propValue[prop] : '';
        }
        value = propValue;
      } else {
        value = item[field] || '';
      }
      
      if (typeof value === 'string' && (value.includes(',') || value.includes('\n') || value.includes('"'))) {
        value = '"' + value.replace(/"/g, '""') + '"';
      }
      
      return value;
    }).join(',');
    
    csvContent += row + '\n';
  });
  
  return csvContent;
};

export const downloadCSV = (csvContent, fileName) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const generateOrdersReport = (orders, timeFrame) => {
  const filteredOrders = filterOrdersByTimeFrame(orders, timeFrame);
  
  const headers = ['Order ID', 'Customer Name', 'Customer Email', 'Total Amount', 'Status', 'Order Date', 'Delivery Address'];
  
  const fieldMap = {
    'Order ID': '_id',
    'Customer Name': 'customer.name',
    'Customer Email': 'customer.email',
    'Total Amount': 'totalAmount',
    'Status': 'status',
    'Order Date': 'createdAt',
    'Delivery Address': 'deliveryAddress'
  };
  
  return convertToCSV(filteredOrders, headers, fieldMap);
};

export const generateProductsReport = (products) => {
  const headers = ['Product ID', 'Title', 'Category', 'Type', 'Price', 'Sale Price', 'Stock', 'Rating', 'Reviews Count'];
  
  const fieldMap = {
    'Product ID': '_id',
    'Title': 'title',
    'Category': 'category',
    'Type': 'type',
    'Price': 'price',
    'Sale Price': 'salePrice',
    'Stock': 'totalStock',
    'Rating': 'rating',
    'Reviews Count': 'reviews'
  };
  
  return convertToCSV(products, headers, fieldMap);
};

export const generateCustomersReport = (orders) => {
  const customerMap = new Map();
  
  orders.forEach(order => {
    if (order.customer && order.customer._id) {
      const customerId = order.customer._id;
      
      if (!customerMap.has(customerId)) {
        customerMap.set(customerId, {
          customerId: customerId,
          name: order.customer.name || '',
          email: order.customer.email || '',
          phone: order.customer.phone || '',
          totalOrders: 0,
          totalSpent: 0,
          lastOrderDate: order.createdAt
        });
      }
      
      const customer = customerMap.get(customerId);
      customer.totalOrders += 1;
      customer.totalSpent += order.totalAmount || 0;
      
      if (new Date(order.createdAt) > new Date(customer.lastOrderDate)) {
        customer.lastOrderDate = order.createdAt;
      }
    }
  });
  
  const headers = ['Customer ID', 'Name', 'Email', 'Phone', 'Total Orders', 'Total Spent', 'Last Order Date'];
  
  const fieldMap = {
    'Customer ID': 'customerId',
    'Name': 'name',
    'Email': 'email',
    'Phone': 'phone',
    'Total Orders': 'totalOrders',
    'Total Spent': 'totalSpent',
    'Last Order Date': 'lastOrderDate'
  };
  
  const customersData = Array.from(customerMap.values())
    .sort((a, b) => b.totalSpent - a.totalSpent);
  
  return convertToCSV(customersData, headers, fieldMap);
};

export const generateReviewsReport = (reviews) => {
  const headers = ['Review ID', 'Product Name', 'Customer Name', 'Rating', 'Comment', 'Review Date'];
  
  const fieldMap = {
    'Review ID': '_id',
    'Product Name': 'productId.title',
    'Customer Name': 'userName',
    'Rating': 'rating',
    'Comment': 'comment',
    'Review Date': 'createdAt'
  };
  
  return convertToCSV(reviews, headers, fieldMap);
};

export const generateGrindingBookingsReport = (bookings) => {
  const headers = ['Booking ID', 'Customer Name', 'Date', 'Time Slot', 'Items', 'Status', 'Notes', 'Booking Date'];
  
  const fieldMap = {
    'Booking ID': '_id',
    'Customer Name': 'customerName',
    'Date': 'date',
    'Time Slot': 'timeSlot',
    'Items': 'items',
    'Status': 'status',
    'Notes': 'notes',
    'Booking Date': 'createdAt'
  };
  
  return convertToCSV(bookings, headers, fieldMap);
};

export const generateComprehensiveReport = (orders, products, customers, reviews, bookings, timeFrame) => {
  const timestamp = new Date().toISOString().split('T')[0];
  const fileName = `comprehensive_report_${timeFrame}_${timestamp}.csv`;
  
  let csvContent = 'COMPREHENSIVE BUSINESS REPORT\n';
  csvContent += `Generated on: ${new Date().toLocaleDateString()}\n`;
  csvContent += `Time Frame: ${timeFrame}\n\n`;
  
  csvContent += '=== ORDERS SUMMARY ===\n';
  csvContent += generateOrdersReport(orders, timeFrame) + '\n\n';
  
  csvContent += '=== PRODUCTS SUMMARY ===\n';
  csvContent += generateProductsReport(products) + '\n\n';
  
  csvContent += '=== CUSTOMERS SUMMARY ===\n';
  csvContent += generateCustomersReport(orders) + '\n\n';
  
  csvContent += '=== REVIEWS SUMMARY ===\n';
  csvContent += generateReviewsReport(reviews) + '\n\n';
  
  csvContent += '=== GRINDING BOOKINGS SUMMARY ===\n';
  csvContent += generateGrindingBookingsReport(bookings) + '\n\n';
  
  downloadCSV(csvContent, fileName);
};

const filterOrdersByTimeFrame = (orders, timeFrame) => {
  if (!timeFrame || timeFrame === 'all') return orders;
  
  const now = new Date();
  const filterDate = new Date();
  
  switch (timeFrame) {
    case 'today':
      filterDate.setHours(0, 0, 0, 0);
      break;
    case 'week':
      filterDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      filterDate.setMonth(now.getMonth() - 1);
      break;
    case 'quarter':
      filterDate.setMonth(now.getMonth() - 3);
      break;
    case 'year':
      filterDate.setFullYear(now.getFullYear() - 1);
      break;
    default:
      return orders;
  }
  
  return orders.filter(order => new Date(order.createdAt) >= filterDate);
};

const generateProductSalesReport = (products, orders, timeFrame) => {
  const filteredOrders = filterOrdersByTimeFrame(orders, timeFrame);
  
  const productSalesMap = new Map();
  
  products.forEach(product => {
    productSalesMap.set(product._id, {
      productId: product._id,
      title: product.title,
      category: product.category,
      type: product.type,
      price: product.price,
      salePrice: product.salePrice,
      quantitySold: 0,
      totalRevenue: 0
    });
  });
  
  filteredOrders.forEach(order => {
    if (order.orderItems && order.orderItems.length) {
      order.orderItems.forEach(item => {
        if (item.productId && productSalesMap.has(item.productId._id)) {
          const productData = productSalesMap.get(item.productId._id);
          const price = item.price || item.productId.price || 0;
          
          productData.quantitySold += item.quantity || 0;
          productData.totalRevenue += (price * (item.quantity || 0));
          
          productSalesMap.set(item.productId._id, productData);
        }
      });
    }
  });
  
  const salesData = Array.from(productSalesMap.values())
    .sort((a, b) => b.quantitySold - a.quantitySold);
  
  const headers = ['Product ID', 'Title', 'Category', 'Type', 'Price', 'Quantity Sold', 'Total Revenue'];
  
  const fieldMap = {
    'Product ID': 'productId',
    'Title': 'title',
    'Category': 'category',
    'Type': 'type',
    'Price': 'price',
    'Quantity Sold': 'quantitySold',
    'Total Revenue': 'totalRevenue'
  };
  
  return convertToCSV(salesData, headers, fieldMap);
};

const generateProductPopularityReport = (products, orders, reviews, timeFrame) => {
  const filteredOrders = filterOrdersByTimeFrame(orders, timeFrame);
  
  const productMap = new Map();
  const reviewMap = new Map();
  
  products.forEach(product => {
    productMap.set(product._id, {
      productId: product._id,
      title: product.title,
      category: product.category,
      type: product.type,
      price: product.price,
      salePrice: product.salePrice,
      quantitySold: 0,
      totalRevenue: 0,
      averageRating: product.rating || 0,
      reviewCount: product.reviews || 0,
      popularityScore: 0
    });
  });
  
  filteredOrders.forEach(order => {
    if (order.orderItems && order.orderItems.length) {
      order.orderItems.forEach(item => {
        if (item.productId && productMap.has(item.productId._id)) {
          const productData = productMap.get(item.productId._id);
          const price = item.price || item.productId.price || 0;
          
          productData.quantitySold += item.quantity || 0;
          productData.totalRevenue += (price * (item.quantity || 0));
          
          productMap.set(item.productId._id, productData);
        }
      });
    }
  });
  
  reviews.forEach(review => {
    if (review.productId && productMap.has(review.productId)) {
      const productData = productMap.get(review.productId);
      productData.averageRating = review.rating;
      productData.reviewCount += 1;
    }
  });
  
  const popularityData = Array.from(productMap.values())
    .map(product => {
      const salesScore = product.quantitySold * 0.4;
      const revenueScore = (product.totalRevenue / 1000) * 0.3;
      const ratingScore = product.averageRating * 0.2;
      const reviewScore = product.reviewCount * 0.1;
      
      product.popularityScore = salesScore + revenueScore + ratingScore + reviewScore;
      return product;
    })
    .sort((a, b) => b.popularityScore - a.popularityScore);
  
  const headers = ['Product ID', 'Title', 'Category', 'Type', 'Price', 'Quantity Sold', 'Total Revenue', 'Average Rating', 'Review Count', 'Popularity Score'];
  
  const fieldMap = {
    'Product ID': 'productId',
    'Title': 'title',
    'Category': 'category',
    'Type': 'type',
    'Price': 'price',
    'Quantity Sold': 'quantitySold',
    'Total Revenue': 'totalRevenue',
    'Average Rating': 'averageRating',
    'Review Count': 'reviewCount',
    'Popularity Score': 'popularityScore'
  };
  
  return convertToCSV(popularityData, headers, fieldMap);
};

export const generateSalesAnalyticsReport = (products, orders, reviews, timeFrame) => {
  const timestamp = new Date().toISOString().split('T')[0];
  const fileName = `sales_analytics_${timeFrame}_${timestamp}.csv`;
  
  let csvContent = 'SALES ANALYTICS REPORT\n';
  csvContent += `Generated on: ${new Date().toLocaleDateString()}\n`;
  csvContent += `Time Frame: ${timeFrame}\n\n`;
  
  csvContent += '=== PRODUCT SALES REPORT ===\n';
  csvContent += generateProductSalesReport(products, orders, timeFrame) + '\n\n';
  
  csvContent += '=== PRODUCT POPULARITY REPORT ===\n';
  csvContent += generateProductPopularityReport(products, orders, reviews, timeFrame) + '\n\n';
  
  downloadCSV(csvContent, fileName);
};