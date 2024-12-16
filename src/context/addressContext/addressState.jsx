import { useState } from "react";
import AddressContext from "./addressContext";

const AddressState = ({ children }) => {
  const [address, setAddress] = useState({
    pickupAddress: "",
    dropOffAddress: "",
  });
  return (
    <AddressContext.Provider value={(address, setAddress)}>
      {children}
    </AddressContext.Provider>
  );
};

export default AddressState;
