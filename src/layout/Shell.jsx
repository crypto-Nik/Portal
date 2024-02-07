import React from "react";
import { Outlet } from "react-router-dom";
import Home from "../pages/Home";
import { AppShell } from "@mantine/core";

function Shell() {
  return (
    <AppShell>
      <Outlet />
      <Home />
    </AppShell>
  );
}

export default Shell;
