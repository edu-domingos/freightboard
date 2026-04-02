import LogsPanel from "./components/LogsPanel";
import UsersPanel from "./components/UsersPanel";
import SystemStatus from "./components/SystemStatus";
import ErrorPanel from "./components/ErrorPanel";
import "./SuperAdmin.css";
import { useState } from "react";

export default function SuperAdmin() {
  return (
    <div className="adminContainer">
      <h1>Painel Super Admin</h1>

      <div className="adminGrid">
        <SystemStatus />
        <UsersPanel />
        <LogsPanel />
        <ErrorPanel />
      </div>
    </div>
  );
}
