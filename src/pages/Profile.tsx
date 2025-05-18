import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface UserProfile {
  displayName: string;
  bio: string;
  subjects: string;
  preferredLocation: string;
  availability: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    displayName: '',
    bio: '',
    subjects: '',
    preferredLocation: '',
    availability: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser, updateUserProfile } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser?.uid) {
        try {
          const docRef = doc(db, 'userProfiles', currentUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            // Initialize with display name if available
            setProfile(prev => ({
              ...prev,
              displayName: currentUser.displayName || '',
            }));
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          setError(t('profile.error'));
        }
      }
    };

    fetchProfile();
  }, [currentUser, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;

    try {
      setError('');
      setSuccess('');
      setLoading(true);

      // Update display name in Firebase Auth
      await updateUserProfile(profile.displayName);

      // Update profile in Firestore
      await setDoc(doc(db, 'userProfiles', currentUser.uid), profile);

      setSuccess(t('profile.success'));
    } catch (err) {
      setError(t('profile.error'));
      console.error(err);
    }
    
    setLoading(false);
  };

  const handleChange = (field: keyof UserProfile) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('profile.title')}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label={t('profile.displayName')}
            value={profile.displayName}
            onChange={handleChange('displayName')}
            required
          />
          <TextField
            fullWidth
            label={t('profile.bio')}
            multiline
            rows={4}
            value={profile.bio}
            onChange={handleChange('bio')}
          />
          <TextField
            fullWidth
            label={t('profile.subjects')}
            value={profile.subjects}
            onChange={handleChange('subjects')}
            placeholder={t('profile.subjects.placeholder')}
          />
          <TextField
            fullWidth
            label={t('profile.location')}
            value={profile.preferredLocation}
            onChange={handleChange('preferredLocation')}
            placeholder={t('profile.location.placeholder')}
          />
          <TextField
            fullWidth
            label={t('profile.availability')}
            value={profile.availability}
            onChange={handleChange('availability')}
            placeholder={t('profile.availability.placeholder')}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {t('profile.save')}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
} 