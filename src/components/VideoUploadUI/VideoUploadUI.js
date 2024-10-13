"use client";

import { useState } from "react";
import { Box, Button, Alert, CircularProgress, TextField, Card, Typography, Grid } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const MAX_VIDEO_SIZE_MB = 4.5;

const VideoUploadUI = ({ UPLOAD_URL, UPLOAD_PRESET, UPLOAD_FOLDER }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [liveLink, setLiveLink] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size / (1024 * 1024) > MAX_VIDEO_SIZE_MB) {
        setError(`File size exceeds ${MAX_VIDEO_SIZE_MB} MB. Please select a smaller video under ${MAX_VIDEO_SIZE_MB} MB.`);
        setFile(null);
      } else {
        setFile(selectedFile);
        setError(null);
        setSuccess(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!title) {
      setError("Title is required.");
      return;
    }
    if (!description) {
      setError("Description is required.");
      return;
    }
    if (!file) {
      setError("Please select a video first.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    console.log("Title:", title);
    console.log("Description:", description);

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
      if (data) {
        console.log(data);

        setLiveLink(data.url);
        setSuccess("Video uploaded successfully!");
      } else {
        setError("Failed to upload video.");
      }

      setTitle("");
      setDescription("");
      setFile(null);

      document.getElementById("video-file-input").value = null;
    } catch (err) {
      setError("Error uploading video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 shadow-lg w-full max-w-lg mx-auto">
      <h5 className="text-lg font-semibold text-center">
        Upload Your Video
      </h5>

      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      {success && <Alert severity="success" className="mb-4">{success}</Alert>}

      <Grid container spacing={2} sx={{ mt: 2, mb: 4 }}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="video-file-input"
            type="file"
            onChange={handleFileChange}
            fullWidth
            variant="outlined"
            inputProps={{ accept: "video/*" }}
            helperText={`Choose a video to upload (Max size: ${MAX_VIDEO_SIZE_MB} MB)`}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
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
            {loading ? <CircularProgress size={24} /> : "Upload Video"}
          </Button>
        </Grid>
      </Grid>

      {liveLink && (
        <Box mt={4} textAlign="center">
          <Alert severity="info">
            Video Live Link: <a href={liveLink} target="_blank" rel="noopener noreferrer">{liveLink}</a>
          </Alert>
        </Box>
      )}
    </Card>
  );
};

export default VideoUploadUI;
