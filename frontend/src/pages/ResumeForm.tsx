import React from 'react';
import { Paper, Button, Chip, Typography, CircularProgress } from '@mui/material';

interface ResumeFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: () => void;
  fileName: string;
  resume: File | null;
  loading: boolean;
  uploadStatus: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  darkMode: boolean;
}

export default function ResumeForm({
  handleSubmit,
  handleFileChange,
  handleRemoveFile,
  fileName,
  resume,
  loading,
  uploadStatus,
  fileInputRef,
  darkMode,
}: ResumeFormProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        width: '90%',
        mx: 'auto',
        p: 4,
        borderRadius: 2,
        background: darkMode ? '#1a202c' : '#ffffff',
        mb: 2,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{
            mb: 2,
            borderRadius: 1,
            borderColor: darkMode ? '#4a5568' : '#2d3748',
            color: darkMode ? '#e2e8f0' : '#2d3748',
            fontWeight: 500,
            fontSize: '1.1rem',
            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            transition: 'all 0.2s',
            '&:hover': {
              background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              borderColor: darkMode ? '#e2e8f0' : '#1a202c',
            },
          }}
        >
          {fileName ? "Change File" : "Select Resume"}
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            hidden
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </Button>
        {fileName && (
          <Chip
            label={fileName}
            onDelete={handleRemoveFile}
            color="primary"
            variant="filled"
            sx={{
              mb: 2,
              fontWeight: 500,
              fontSize: '1rem',
              background: darkMode ? '#4a5568' : '#2d3748',
              color: '#fff',
            }}
          />
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            py: 1.5,
            borderRadius: 1,
            fontWeight: 500,
            fontSize: '1.1rem',
            background: darkMode ? '#4a5568' : '#2d3748',
            boxShadow: 'none',
            transition: 'all 0.2s',
            opacity: resume && !loading ? 1 : 0.7,
            '&:hover': {
              background: darkMode ? '#2d3748' : '#1a202c',
            },
          }}
          disabled={!resume || loading}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </Button>
        {uploadStatus && (
          <Typography
            color={uploadStatus.includes('success') ? 'success.main' : 'error.main'}
            mt={2}
            fontWeight={500}
            align="center"
            sx={{
              letterSpacing: 0.5,
              fontSize: '1rem',
            }}
          >
            {uploadStatus}
          </Typography>
        )}
      </form>
    </Paper>
  );
} 