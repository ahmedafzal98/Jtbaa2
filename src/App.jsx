import React, { useState } from "react";
import PaymentSection from "./components/paymentSection/PaymentSection"; // Import PaymentSection
import "./App.css";
import { MyContext } from "./context/Context"; // Import MyContext
import AddressState from "./context/addressContext/addressState"; // Import AddressState
import AddressContext from "./context/addressContext/addressContext";
import { FormContext } from "./context/formContext/FormContext";

function App() {
  const [summaryData, setSummaryData] = useState({});
  const [address, setAddress] = useState({
    pickupAddress: "",
    dropOffAddress: "",
  });
  const [formData, setFormdata] = useState({
    name: "",
    phoneNum: "",
    itemName: "",
    description: "",
  });

  return (
    <MyContext.Provider value={{ summaryData, setSummaryData }}>
      <AddressContext.Provider value={{ address, setAddress }}>
        <FormContext.Provider value={{ formData, setFormdata }}>
          <PaymentSection />
        </FormContext.Provider>
      </AddressContext.Provider>
    </MyContext.Provider>
  );
}

export default App;
