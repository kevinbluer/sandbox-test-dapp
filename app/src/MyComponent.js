import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import logo from "./logo.png";

const { AccountData, ContractData, ContractForm } = newContextComponents;


const VisitorSummary = ({ drizzle, drizzleState }) => (
  <h3>
    <span>
    <ContractData
      drizzle={drizzle}
      drizzleState={drizzleState}
      contract="SimpleStorage"
      method="interactionCount"
    />
    <span> impressions </span>
    <span> by </span>
    <ContractData
      drizzle={drizzle}
      drizzleState={drizzleState}
      contract="SimpleStorage"
      method="uniqueGuestCount"
    />
      <span> guests</span>
    </span>
  </h3>

)

export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props
  return (
    <div className="App">
      <ToastContainer />
      <div>
        <img src={logo} alt="drizzle-logo" />
        <h1>Contract monitoring</h1>
      </div>

      <div className="section">
        <h2>Active Account</h2>
        <AccountData
          drizzle={drizzle}
          drizzleState={drizzleState}
          accountIndex={0}
          units="ether"
          precision={3}
        />
      </div>

      <div className="section">
        <strong>Stored Value: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SimpleStorage"
            method="storedData"
          />
        <ContractForm drizzle={drizzle} contract="SimpleStorage" method="set" />
      </div>

      <div className="section">
        <h2>GuestList</h2>
        <VisitorSummary drizzle={drizzle} drizzleState={drizzleState} />
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="SimpleStorage"
          method="guestList"
        />

      </div>

    </div>
  );
};
