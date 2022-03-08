import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

import { getBlockedList, setBlockedList } from "../main";

function BlockedList(props) {
  const [blockedText, setBlockedText] = useState("");

  useEffect(() => {
    console.log("useEffect blockedList");
    getBlockedList().then((text) => {
      setBlockedText(text);
    });
  }, [props.newChange]);

  const handleListChange = (event) => {
    setBlockedText(event.target.value);
  };

  const onSubmitList = () => {
    setBlockedList(blockedText);
  };

  return (
    props.value === 1 && (
      <Box sx={{ width: 500 }}>
        <TextField
          multiline
          fullWidth
          rows={5}
          value={blockedText}
          onChange={handleListChange}
        />
        <Button
          variant='contained'
          endIcon={<SendIcon />}
          onClick={onSubmitList}
        >
          Submit
        </Button>
      </Box>
    )
  );
}

export default BlockedList;
