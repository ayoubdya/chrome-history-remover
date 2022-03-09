import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { isBlocked, blockUrl, waitlistUrl, getCurrentUrl } from "../utils/main";

function AddUrl(props) {
  const [currentUrl, setCurrentUrl] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    console.log("useEffect addurl");
    getCurrentUrl().then((url) => {
      setCurrentUrl(url);
      isBlocked(url).then((isBlocked) => {
        setChecked(isBlocked);
      });
    });
  }, [props.newChange]);

  const onSwitchChange = () => {
    if (!checked) blockUrl(currentUrl);
    else waitlistUrl(currentUrl);
    setChecked(!checked);
  };

  return (
    props.value === 0 && (
      <Box sx={{ width: 500 }}>
        <Stack direction='row' alignItems='center' spacing={1}>
          <Switch
            checked={checked}
            onChange={onSwitchChange}
            name='AddUrl'
            color='primary'
          />
          <Typography fontWeight={700}>Add URL to the blocked list</Typography>
        </Stack>
      </Box>
    )
  );
}

export default AddUrl;
