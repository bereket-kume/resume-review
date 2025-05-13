import React from 'react';
import { Box, Paper, Typography, CircularProgress, Divider } from '@mui/material';

interface ResumeAnalysisProps {
    analysis: string;
    loading: boolean;
    darkMode: boolean;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ analysis, loading, darkMode }) => {
    const formatAnalysis = (text: string) => {
        if (!text) return '';
        
        // Split the text into sections based on newlines
        const sections = text.split('\n').filter(line => line.trim());
        
        return sections.map((section, index) => {
            // Check if the section is a heading (usually in all caps or ends with a colon)
            const isHeading = section.toUpperCase() === section || section.endsWith(':');
            const isSubHeading = section.startsWith('-') || section.startsWith('•');
            
            return (
                <Box key={index} sx={{ mb: isHeading ? 3 : 1.5 }}>
                    {isHeading && index > 0 && (
                        <Divider sx={{ 
                            my: 2, 
                            borderColor: darkMode ? '#4A5568' : '#E2E8F0',
                            opacity: 0.5
                        }} />
                    )}
                    <Typography
                        variant={isHeading ? "h6" : "body1"}
                        sx={{
                            fontWeight: isHeading ? 700 : (isSubHeading ? 500 : 400),
                            color: darkMode ? '#E2E8F0' : '#2D3748',
                            mb: isHeading ? 1.5 : 0.5,
                            pl: isSubHeading ? 3 : (isHeading ? 0 : 2),
                            fontSize: isHeading ? '1.1rem' : '1rem',
                            lineHeight: 1.6,
                            '&::before': isSubHeading ? {
                                content: '"•"',
                                position: 'absolute',
                                left: '16px',
                                color: darkMode ? '#4A5568' : '#A0AEC0'
                            } : {},
                            position: 'relative'
                        }}
                    >
                        {section.replace(/\*/g, '')}
                    </Typography>
                </Box>
            );
        });
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                borderRadius: 2,
                background: darkMode ? '#1A202C' : '#FFFFFF',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                },
                width: '100%',
                maxWidth: '800px',
                mx: 'auto'
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    mb: 3,
                    color: darkMode ? '#E2E8F0' : '#2D3748',
                    fontWeight: 700,
                    borderBottom: `2px solid ${darkMode ? '#4A5568' : '#E2E8F0'}`,
                    pb: 2,
                    textAlign: 'center',
                    fontSize: '1.5rem'
                }}
            >
                Resume Analysis Results
            </Typography>
            
            {loading ? (
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    p: 4,
                    gap: 2
                }}>
                    <CircularProgress size={40} />
                    <Typography
                        sx={{
                            color: darkMode ? '#A0AEC0' : '#718096',
                            fontSize: '0.9rem'
                        }}
                    >
                        Analyzing your resume...
                    </Typography>
                </Box>
            ) : analysis ? (
                <Box sx={{ 
                    maxHeight: '600px', 
                    overflowY: 'auto',
                    px: 1,
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: darkMode ? '#2D3748' : '#F7FAFC',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: darkMode ? '#4A5568' : '#CBD5E0',
                        borderRadius: '4px',
                        '&:hover': {
                            background: darkMode ? '#718096' : '#A0AEC0',
                        },
                    },
                }}>
                    {formatAnalysis(analysis)}
                </Box>
            ) : (
                <Box sx={{
                    textAlign: 'center',
                    py: 6,
                    px: 2
                }}>
                    <Typography
                        sx={{
                            color: darkMode ? '#A0AEC0' : '#718096',
                            fontStyle: 'italic',
                            fontSize: '1.1rem',
                            mb: 1
                        }}
                    >
                        Upload a resume to see the analysis
                    </Typography>
                    <Typography
                        sx={{
                            color: darkMode ? '#718096' : '#A0AEC0',
                            fontSize: '0.9rem'
                        }}
                    >
                        We'll provide detailed feedback on your resume
                    </Typography>
                </Box>
            )}
        </Paper>
    );
};

export default ResumeAnalysis; 