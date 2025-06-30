
export const customerColumns = [
  { key: 'contactName', label: 'Name' ,type:'string' },
  { key: 'companyName', label: 'Company' ,type:'string' },
  { key: 'country', label: 'Country',type:'string' },
  { key: 'phone', label: 'Phone',type:'string' }
];


export const orderColumns = [
  { key: 'customerId', label: 'CustomerId',type:'string' },
  { key: 'shipName', label: 'Ship Name',type:'string' },
  { key: 'orderDate', label: 'Ordered Date  ',type:'date' },
  { key: 'freight', label: 'Freight',type:'string' },
  { key: 'shippedDate', label: 'Ship Date',type:'date' }
];

export const orderDetailColumns = [
  { key: 'discount', label: 'Discount',type:'string' },
  { key: 'orderId', label: 'Order ID',type:'string' },
  { key: 'productId', label: 'Product ID',type:'string' },
  { key: 'quantity', label: 'Quantity',type:'string' },
  { key: 'unitPrice', label: 'Unit Price',type:'string' }
];