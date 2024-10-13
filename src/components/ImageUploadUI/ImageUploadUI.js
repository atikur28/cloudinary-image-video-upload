"use client";

import { useState, useRef } from "react";
import { Box, Button, Alert, CircularProgress, TextField, Card, Typography, Grid } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ImageUploadUI = ({ UPLOAD_URL, UPLOAD_PRESET, UPLOAD_FOLDER }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [liveLink, setLiveLink] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setSuccess(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", UPLOAD_FOLDER);

    try {
      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.url) {
        setLiveLink(data.url);
        setSuccess("Image uploaded successfully!");
      } else {
        setError("Failed to upload image.");
      }

      setFile(null);
      fileInputRef.current.value = "";
    } catch (err) {
      setError("Error uploading image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 shadow-lg w-full max-w-lg mx-auto">
      <h5 className="text-lg font-semibold text-center">
        Upload Your Image
      </h5>

      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      {success && <Alert severity="success" className="mb-4">{success}</Alert>}

      <Grid container spacing={2} sx={{ mt: 2, mb: 4}}>
        <Grid item xs={12}>
          <TextField
            type="file"
            inputRef={fileInputRef}
            onChange={handleFileChange}
            fullWidth
            variant="outlined"
            inputProps={{ accept: "image/*" }}
            helperText="Choose an image to upload"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#888',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3f51b5',
                },
              },
              '& .MuiFormHelperText-root': {
                marginTop: '4px',
                color: '#888',
                fontStyle: 'italic',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} className="flex justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={loading || !file}
            startIcon={!loading && <CloudUploadIcon />}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Upload Image"}
          </Button>
        </Grid>
      </Grid>

      {liveLink && (
        <Box mt={4} textAlign="center">
          <Alert severity="info">
            Image Live Link: <a href={liveLink} target="_blank" rel="noopener noreferrer">{liveLink}</a>
          </Alert>
        </Box>
      )}
    </Card>
  );
};

export default ImageUploadUI;
