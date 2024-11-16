import { dateString } from "../../../lib/helperFunction";

const pdfGenerator = (order) => {
  const originalTitle = document.title;
  const invoiceData = {
    companyName: "Ez Buy",
    companyAddress: "123 Main Street, Nowhere, Neptune",
    companyPhone: "123-456-7890",
    companyEmail: "ezbuy@money.com",

    orderId: order._id,
    orderDate: dateString(order.createdAt),
    // dueDate: new Date(order.createdAt).toLocaleDateString(),
    customerName: order.shippingAddress.name,
    customerEmail: order.userEmail,
    shippingAddress:
      order.shippingAddress.streetAddress + ", " + order.shippingAddress.city,

    paymentMethod: order.paymentDetails.method,
    deliveryStatus: order.deliveryStatus,
    products: order.products,

    shippingCost: order?.shippingCharges || 0,
    couponDiscount: order.couponDiscount,
    totalAmount: order.totalAmount,
  };

  // Create a temporary container
  const printContainer = document.createElement("div");
  printContainer.id = "printable-content";
  document.body.appendChild(printContainer);

  // Add content to the container
  printContainer.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 40px; background: white;">
      <div style="margin-bottom: 20px;">
        <h2 style="margin: 0; color: #333; font-size: 24px;">${
          invoiceData.companyName
        }</h2>
        <p style="margin: 5px 0;">${invoiceData.companyAddress}</p>
        <p style="margin: 5px 0;">Phone: ${invoiceData.companyPhone}</p>
        <p style="margin: 5px 0;">Email: ${invoiceData.companyEmail}</p>
      </div>

      <h1 style="border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; margin-bottom: 20px; font-size: 28px;">Invoice</h1>
      
      <div style="margin-bottom: 20px;">
        <p style="margin: 5px 0;"><strong>Invoice Number:</strong> ${
          invoiceData.orderId
        }</p>
        <p style="margin: 5px 0;"><strong>Order Date:</strong> ${
          invoiceData.orderDate
        }</p>
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="margin: 0 0 10px 0;">Bill To:</h3>
        <p style="margin: 5px 0;"><strong>${
          invoiceData.customerName
        }</strong></p>
        <p style="margin: 5px 0;">${invoiceData.shippingAddress}</p>
        <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${
          invoiceData.paymentMethod === "online"
            ? "Online Payment"
            : "Cash on Delivery"
        }</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f8f8f8;">
            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Product</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Price</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Quantity</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceData.products
            .map(
              (product) => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;">${
                product.title
              }</td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">$${
                product.price
              }</td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">${
                product.quantity
              }</td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">$${(
                product.price * product.quantity
              ).toFixed(2)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="border: 1px solid #ddd; padding: 12px; text-align: right;">Shipping Cost:</td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">$${
              invoiceData.shippingCost
            }</td>
          </tr>
         
            <tr>
              <td colspan="3" style="border: 1px solid #ddd; padding: 12px; text-align: right;">Coupon Discount:</td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">${
                invoiceData.couponDiscount
              }%</td>
            </tr>
         
          <tr>
            <td colspan="3" style="border: 1px solid #ddd; padding: 12px; text-align: right;"><strong>Total:</strong></td>
            <td style="border: 1px solid #ddd; padding: 12px; text-align: right;"><strong>$${
              invoiceData.totalAmount
            }</strong></td>
          </tr>
        </tfoot>
      </table>

     

      <div style="text-align: center; margin-top: 40px; color: #666;">
        <p style="margin: 5px 0;">Thank you for your business!</p>
        <p style="margin: 5px 0;">If you have any questions, please contact us</p>
        <p style="margin: 5px 0;">${invoiceData.companyPhone} | ${
    invoiceData.customerEmail
  }</p>
      </div>
    </div>
  `;

  // Add print-specific styles
  const style = document.createElement("style");
  style.textContent = `
    @media print {
      body > *:not(#printable-content) {
        display: none;
      }
      body {
        margin: 0;
        padding: 0;
        background: white;
      }
      #printable-content {
        display: block !important;
        position: relative;
        padding: 20px;
        margin: 0;
        background: white;
      }
      @page {
        size: A4;
        margin: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Trigger print
  setTimeout(() => {
    document.title = `Invoice-${invoiceData.orderId}`;
    window.print();
    // Cleanup after print dialog closes
    setTimeout(() => {
      document.title = originalTitle;
      document.body.removeChild(printContainer);
      document.head.removeChild(style);
    }, 1000);
  }, 500);
};

// <div style="margin-bottom: 20px;">
//      <p><strong>Delivery Status:</strong> ${
//       invoiceData.deliveryStatus
//     }</p>
//   </div>

export default pdfGenerator;
