import React, { useState, useRef } from 'react';
import { Container, Box, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { DashboardHeader } from './DashboardHeader';
import ResumeForm from './ResumeForm';
import ResumeAnalysis from './ResumeAnalysis';

const MAX_FILE_SIZE_MB = 5;

export default function Dashboard() {
    const [resume, setResume] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [analysis, setAnalysis] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [darkMode, setDarkMode] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
    const navigate = useNavigate();
    const auth = getAuth();

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            background: {
                default: darkMode ? '#171923' : '#f5f7fa',
                paper: darkMode ? '#1a202c' : '#ffffff',
            },
        },
    });

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully");
            navigate('/login');
        } catch (error) {
            console.error("Error signing out: ", error);
            setUploadStatus("Error logging out. Please try again.");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];
            if (!allowedTypes.includes(file.type)) {
                setUploadStatus('Only PDF, DOC, or DOCX files are allowed.');
                setResume(null);
                setFileName('');
                return;
            }
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                setUploadStatus(`File size must be less than ${MAX_FILE_SIZE_MB}MB.`);
                setResume(null);
                setFileName('');
                return;
            }
            setResume(file);
            setFileName(file.name);
            setUploadStatus('');
            setAnalysis('');
        }
    };

    const handleRemoveFile = () => {
        setResume(null);
        setFileName('');
        setUploadStatus('');
        setAnalysis('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resume) {
            setUploadStatus('Please select a file.');
            return;
        }
        setLoading(true);
        setUploadStatus('');
        setAnalysis('');

        const formData = new FormData();
        formData.append('file', resume);

        try {
            const token = await auth.currentUser?.getIdToken();
            if (!token) {
                setUploadStatus('Authentication error. Please log in again.');
                setLoading(false);
                return;
            }

            const response = await fetch('http://localhost:3000/resumes/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setAnalysis(data.review);
            setUploadStatus('✨ Analysis completed successfully!');
            
            setResume(null);
            setFileName('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error: any) {
            console.error('Error:', error);
            setUploadStatus(`❌ Error analyzing resume: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    minHeight: '100vh',
                    background: darkMode ? '#171923' : '#f5f7fa',
                    position: 'relative',
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            minHeight: '100vh',
                            py: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        <DashboardHeader 
                            onLogout={handleLogout} 
                            darkMode={darkMode}
                            toggleDarkMode={toggleDarkMode}
                        />
                        <ResumeForm
                            handleSubmit={handleSubmit}
                            handleFileChange={handleFileChange}
                            handleRemoveFile={handleRemoveFile}
                            fileName={fileName}
                            resume={resume}
                            loading={loading}
                            uploadStatus={uploadStatus}
                            fileInputRef={fileInputRef}
                            darkMode={darkMode}
                        />
                        <ResumeAnalysis 
                            analysis={analysis} 
                            loading={loading}
                            darkMode={darkMode}
                        />
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}