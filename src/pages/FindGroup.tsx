import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
} from '@mui/material';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  location: string;
  maxMembers: number;
  currentMembers: number;
  description: string;
  createdBy: string;
}

export default function FindGroup() {
  const [activeTab, setActiveTab] = useState(0);
  const [groupName, setGroupName] = useState('');
  const [subject, setSubject] = useState('');
  const [location, setLocation] = useState('online');
  const [maxMembers, setMaxMembers] = useState('5');
  const [description, setDescription] = useState('');
  const [searchResults, setSearchResults] = useState<StudyGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { currentUser } = useAuth();

  const handleSearch = async () => {
    try {
      const q = query(
        collection(db, 'studyGroups'),
        where('subject', '==', subject),
        where('location', '==', location)
      );

      const querySnapshot = await getDocs(q);
      const results: StudyGroup[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        results.push({
          id: doc.id,
          name: data.name,
          subject: data.subject,
          location: data.location,
          maxMembers: data.maxMembers,
          currentMembers: data.currentMembers,
          description: data.description,
          createdBy: data.createdBy,
        });
      });

      setSearchResults(results);
    } catch (error) {
      console.error('Error searching for groups:', error);
    }
  };

  const handleCreateGroup = async () => {
    try {
      await addDoc(collection(db, 'studyGroups'), {
        name: groupName,
        subject,
        location,
        maxMembers: parseInt(maxMembers),
        currentMembers: 1,
        description,
        createdBy: currentUser?.uid,
        members: [currentUser?.uid],
        createdAt: new Date().toISOString(),
      });

      // Reset form
      setGroupName('');
      setSubject('');
      setLocation('online');
      setMaxMembers('5');
      setDescription('');
      
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleGroupSelect = (group: StudyGroup) => {
    setSelectedGroup(group);
    setDialogOpen(true);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Study Groups
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Find a Group" />
            <Tab label="Create a Group" />
          </Tabs>
        </Box>

        {activeTab === 0 ? (
          // Find Group Tab
          <>
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <TextField
                fullWidth
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <Select
                  value={location}
                  label="Location"
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <MenuItem value="online">Online</MenuItem>
                  <MenuItem value="in-person">In-person</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{ minWidth: '120px' }}
              >
                Search
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {searchResults.map((group) => (
                <Card key={group.id}>
                  <CardContent>
                    <Typography variant="h6">{group.name}</Typography>
                    <Typography color="textSecondary">
                      Subject: {group.subject}
                    </Typography>
                    <Typography color="textSecondary">
                      Location: {group.location}
                    </Typography>
                    <Typography color="textSecondary">
                      Members: {group.currentMembers}/{group.maxMembers}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {group.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleGroupSelect(group)}
                    >
                      Join Group
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Box>
          </>
        ) : (
          // Create Group Tab
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={location}
                label="Location"
                onChange={(e) => setLocation(e.target.value)}
              >
                <MenuItem value="online">Online</MenuItem>
                <MenuItem value="in-person">In-person</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Maximum Members"
              type="number"
              value={maxMembers}
              onChange={(e) => setMaxMembers(e.target.value)}
              inputProps={{ min: 2, max: 20 }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleCreateGroup}
              sx={{ mt: 2 }}
            >
              Create Group
            </Button>
          </Box>
        )}
      </Paper>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          Join {selectedGroup?.name}
        </DialogTitle>
        <DialogContent>
          <Typography>
            Would you like to join this study group?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setDialogOpen(false)}>
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 