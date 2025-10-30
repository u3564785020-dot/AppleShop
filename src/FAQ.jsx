import React from "react";

const FAQ = () => (
  <div className="aboutcontainer">
    <h3 className="abouttiltle">Frequently Asked Questions</h3>
    <div className="abouttext">
      <div className="abouttextbig">FAQ</div>
      <ul>
        <li><b>How do I place an order?</b> — Add desired products to your cart and follow the checkout steps on the website.</li>
        <li><b>What payment methods do you accept?</b> — We accept credit/debit cards and popular e-wallets.</li>
        <li><b>Is shopping on TechMarket safe?</b> — Yes, we use industry-standard encryption to protect your data.</li>
        <li><b>Can I return a product?</b> — Yes, within 14 days of purchase. See our Return Policy for more details.</li>
        <li><b>How long does shipping take?</b> — Usually 2-7 business days, depending on your region.</li>
      </ul>
      <div>Still have questions? Email us at support@techmarket.com</div>
    </div>
  </div>
);

export default FAQ;
