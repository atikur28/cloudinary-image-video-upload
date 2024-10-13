"use client";

import { Button } from "@mui/material";

const ScrollButton = () => {
  const scrollToUploadSection = () => {
    document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Button variant="contained" color="primary" onClick={scrollToUploadSection}>
      Get Started
    </Button>
  );
};

export default ScrollButton;
