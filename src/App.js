/*global chrome*/
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import AddUrl from "./components/AddUrl";
import BlockedList from "./components/BlockedList";

function App() {
  const [newChange, setNewChange] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
          `Storage key "${key}" in namespace "${namespace}" changed.`,
          `Old value was "${oldValue}", new value is "${newValue}".`
        );
        setNewChange(newValue);
      }
    });
  }, []);

  return (
    <>
      <Box sx={{ mb: 2, width: 500 }}>
        <BottomNavigation
          showLabels
          value={tabValue}
          onChange={(event, newValue) => {
            setTabValue(newValue);
          }}
        >
          <BottomNavigationAction label='Add Current' icon={<RestoreIcon />} />
          <BottomNavigationAction
            label='Add Manually'
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction label='About Me' icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Box>
      <AddUrl value={tabValue} newChange={newChange} />
      <BlockedList value={tabValue} newChange={newChange} />
    </>
  );
}

export default App;
