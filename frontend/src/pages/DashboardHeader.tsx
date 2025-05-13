import React from 'react';
import { Paper, Typography, Button, Tabs, Tab, Box, IconButton, AppBar, Toolbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DescriptionIcon from '@mui/icons-material/Description';

interface DashboardHeaderProps {
  onLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  onLogout, 
  darkMode, 
  toggleDarkMode 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        width: '90%',
        mx: 'auto',
        borderRadius: 2,
        background: darkMode ? '#1a202c' : '#ffffff',
        overflow: 'hidden',
      }}
    >
      <AppBar 
        position="static" 
        color="transparent" 
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: darkMode ? 'rgba(255, 255, 255, 0.12)' : 'divider',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DescriptionIcon 
              sx={{ 
                fontSize: 32,
                color: darkMode ? '#e2e8f0' : '#2d3748',
              }} 
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: darkMode ? '#e2e8f0' : '#2d3748',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Resume Analyzer
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              onClick={toggleDarkMode} 
              sx={{
                color: darkMode ? '#e2e8f0' : '#2d3748',
                '&:hover': {
                  background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                },
              }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Button
              onClick={onLogout}
              variant="contained"
              size="small"
              sx={{
                background: darkMode ? '#4a5568' : '#2d3748',
                color: '#fff',
                fontWeight: 500,
                px: 2,
                '&:hover': {
                  background: darkMode ? '#2d3748' : '#1a202c',
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>

        <Tabs 
          value={location.pathname} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              color: darkMode ? '#a0aec0' : '#4a5568',
              fontWeight: 500,
              fontSize: '0.95rem',
              minHeight: 48,
              textTransform: 'none',
              '&.Mui-selected': {
                color: darkMode ? '#e2e8f0' : '#2d3748',
                fontWeight: 600,
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: darkMode ? '#e2e8f0' : '#2d3748',
            },
          }}
        >
          <Tab label="Dashboard" value="/dashboard" />
          <Tab label="My Resumes" value="/resumes" />
          <Tab label="Analytics" value="/analytics" />
          <Tab label="Settings" value="/settings" />
        </Tabs>
      </AppBar>
    </Paper>
  );
}; 