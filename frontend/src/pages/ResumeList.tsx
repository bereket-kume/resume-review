import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardActions, Button, CircularProgress, Chip } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { format } from 'date-fns';

interface Resume {
    id: string;
    original_name: string;
    file_path: string;
    created_at: string;
    review: string;
}

const ResumeList: React.FC = () => {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const auth = getAuth();

    const fetchResumes = async () => {
        try {
            const token = await auth.currentUser?.getIdToken();
            if (!token) {
                setError('Authentication error. Please log in again.');
                return;
            }

            const response = await fetch('http://localhost:3000/resumes', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch resumes');
            }

            const data = await response.json();
            setResumes(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResumes();
    }, []);

    const handleViewReview = (resumeId: string) => {
        // Navigate to review page or show review in modal
        window.location.href = `/resume/${resumeId}`;
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                My Resumes
            </Typography>

            {resumes.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                        No resumes uploaded yet
                    </Typography>
                    <Button 
                        variant="contained" 
                        sx={{ mt: 2 }}
                        onClick={() => window.location.href = '/dashboard'}
                    >
                        Upload Resume
                    </Button>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {resumes.map((resume) => (
                        <Grid item xs={12} sm={6} md={4} key={resume.id}>
                            <Card 
                                sx={{ 
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 3
                                    }
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {resume.original_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Uploaded on {format(new Date(resume.created_at), 'MMM dd, yyyy')}
                                    </Typography>
                                    <Chip 
                                        label="Reviewed" 
                                        color="success" 
                                        size="small" 
                                        sx={{ mt: 1 }}
                                    />
                                </CardContent>
                                <CardActions>
                                    <Button 
                                        size="small" 
                                        onClick={() => handleViewReview(resume.id)}
                                    >
                                        View Review
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default ResumeList; 