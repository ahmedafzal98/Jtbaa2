import PaymentSection from "./components/paymentSection/PaymentSection";
import "./App.css";
import { MyContext } from "./context/Context";
import { useState } from "react";
function App() {
  const [summaryData, setSummaryData] = useState({});
  return (
    <MyContext.Provider value={{ summaryData, setSummaryData }}>
      <PaymentSection />
    </MyContext.Provider>
  );
}

export default App;
