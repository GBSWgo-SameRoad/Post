import React, { useEffect } from 'react';

const PaymentPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://js.tosspayments.com/v1/payment-widget";
    script.async = true;
    document.body.appendChild(script);

    const clientKey = 'test_ck_QbgMGZzorzezE2lkEPPVl5E1em4d';
    const customerKey = 'G2MD0ghzwL7EwQH01EOfK';
    const paymentWidget = window.PaymentWidget(clientKey, customerKey);

    paymentWidget.renderPaymentMethods('#payment-method', { value: 15000 });
    paymentWidget.renderAgreement('#agreement');
    
    const button = document.getElementById('payment-button');
    button.addEventListener('click', function () {
      paymentWidget.requestPayment({
        orderId: '4TITFDV0Qqs0xzmtqqtjD64',
        orderName: '토스 티셔츠 외 64건',
        successUrl: 'http://localhost:3030/api/payments/success',
        failUrl: 'http://localhost:3030/api/fail',
        customerEmail: 'customer123@gmail.com',
        customerName: '김토스',
      });
    });
  }, []);

  return (
    <div>
      <div id="payment-method"></div>
      <div id="agreement"></div>
      <button id="payment-button">결제하기</button>
    </div>
  );
};

export default PaymentPage;
