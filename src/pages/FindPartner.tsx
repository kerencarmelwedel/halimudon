import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  IconButton,
  Menu,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  Badge,
  Divider,
  Card,
  CardContent,
  CardActions,
  Rating,
  Container,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  ExpandMore as ExpandMoreIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  Language as LanguageIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

interface FilterState {
  subjects: string[];
  locations: string[];
  availability: string[];
  languages: string[];
  studyStyles: string[];
}

interface Partner {
  id: number;
  name: string;
  avatar: string;
  subjects: string[];
  location: string;
  availability: string[];
  languages: string[];
  studyStyles: string[];
  rating: number;
  bio: string;
}

// Mock data for study partners
const mockPartners = [
  {
    id: 1,
    name: 'Sarah Cohen',
    avatar: '',
    subjects: ['math', 'physics'],
    location: 'library',
    availability: ['weekdayMornings', 'weekends'],
    languages: ['english', 'hebrew'],
    studyStyles: ['visual', 'group'],
    rating: 4.5,
    bio: 'Physics major with a passion for mathematics. I enjoy helping others understand complex concepts through visual learning.',
  },
  {
    id: 2,
    name: 'David Levy',
    avatar: '',
    subjects: ['computerScience', 'math'],
    location: 'online',
    availability: ['weekdayEvenings', 'weekends'],
    languages: ['english', 'russian'],
    studyStyles: ['handson', 'reading'],
    rating: 4.8,
    bio: 'Computer Science student specializing in algorithms and data structures. I believe in practical, hands-on learning approaches.',
  },
  {
    id: 3,
    name: 'Maya Stern',
    avatar: '',
    subjects: ['biology', 'chemistry'],
    location: 'campus',
    availability: ['weekdayAfternoons'],
    languages: ['english', 'hebrew'],
    studyStyles: ['group', 'auditory'],
    rating: 4.2,
    bio: 'Pre-med student with strong background in biology and chemistry. I love group study sessions and interactive learning.',
  },
];

export default function FindPartner() {
  const { t } = useLanguage();
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(() => {
    const savedFilters = localStorage.getItem('partnerFilters');
    return savedFilters ? JSON.parse(savedFilters) : {
      subjects: [],
      locations: [],
      availability: [],
      languages: [],
      studyStyles: [],
    };
  });

  const [filteredPartners, setFilteredPartners] = useState<Partner[]>(mockPartners);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('partnerFilters', JSON.stringify(filters));
  }, [filters]);

  // Update filtered partners whenever filters or search query change
  useEffect(() => {
    const filtered = mockPartners.filter(partner => {
      // Search query filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
          partner.name.toLowerCase().includes(searchLower) ||
          partner.bio.toLowerCase().includes(searchLower) ||
          partner.subjects.some(subject => subject.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      // Filter categories
      const matchesSubjects = filters.subjects.length === 0 || 
        partner.subjects.some(subject => filters.subjects.includes(subject));
      
      const matchesLocations = filters.locations.length === 0 || 
        filters.locations.includes(partner.location);
      
      const matchesAvailability = filters.availability.length === 0 || 
        partner.availability.some(time => filters.availability.includes(time));
      
      const matchesLanguages = filters.languages.length === 0 || 
        partner.languages.some(lang => filters.languages.includes(lang));
      
      const matchesStudyStyles = filters.studyStyles.length === 0 || 
        partner.studyStyles.some(style => filters.studyStyles.includes(style));

      return matchesSubjects && matchesLocations && matchesAvailability && 
             matchesLanguages && matchesStudyStyles;
    });

    setFilteredPartners(filtered);
  }, [filters, searchQuery]);

  const filterOptions = {
    subjects: [
      { key: 'math', label: t('filters.subjects.math') },
      { key: 'physics', label: t('filters.subjects.physics') },
      { key: 'chemistry', label: t('filters.subjects.chemistry') },
      { key: 'biology', label: t('filters.subjects.biology') },
      { key: 'computerScience', label: t('filters.subjects.computerScience') },
      { key: 'literature', label: t('filters.subjects.literature') },
      { key: 'history', label: t('filters.subjects.history') },
      { key: 'economics', label: t('filters.subjects.economics') },
    ],
    locations: [
      { key: 'online', label: t('filters.locations.online') },
      { key: 'library', label: t('filters.locations.library') },
      { key: 'campus', label: t('filters.locations.campus') },
      { key: 'cafe', label: t('filters.locations.cafe') },
    ],
    availability: [
      { key: 'weekdayMornings', label: t('filters.availability.weekdayMornings') },
      { key: 'weekdayAfternoons', label: t('filters.availability.weekdayAfternoons') },
      { key: 'weekdayEvenings', label: t('filters.availability.weekdayEvenings') },
      { key: 'weekends', label: t('filters.availability.weekends') },
    ],
    languages: [
      { key: 'english', label: t('filters.languages.english') },
      { key: 'hebrew', label: t('filters.languages.hebrew') },
      { key: 'arabic', label: t('filters.languages.arabic') },
      { key: 'russian', label: t('filters.languages.russian') },
    ],
    studyStyles: [
      { key: 'visual', label: t('filters.studyStyles.visual') },
      { key: 'auditory', label: t('filters.studyStyles.auditory') },
      { key: 'handson', label: t('filters.studyStyles.handson') },
      { key: 'reading', label: t('filters.studyStyles.reading') },
      { key: 'group', label: t('filters.studyStyles.group') },
    ],
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchor(null);
  };

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(item => item !== value);
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
      return newFilters;
    });
  };

  const handleClearFilters = () => {
    setFilters({
      subjects: [],
      locations: [],
      availability: [],
      languages: [],
      studyStyles: [],
    });
    setSearchQuery('');
  };

  const handleRemoveFilter = (category: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item !== value)
    }));
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((count, categoryFilters) => count + categoryFilters.length, 0);
  };

  const getLabelForFilter = (category: keyof FilterState, value: string) => {
    const option = filterOptions[category].find(opt => opt.key === value);
    return option ? option.label : value;
  };

  return (
    <Container maxWidth="lg">
      {/* Search and Filter Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('home.findPartner.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {t('home.findPartner.description')}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <TextField
            fullWidth
            placeholder="Search by name, subject, or bio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchQuery('')}>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Badge
            badgeContent={getActiveFilterCount()}
            color="primary"
          >
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleFilterClick}
            >
              Filters
            </Button>
          </Badge>
        </Box>

        {/* Active Filters */}
        {getActiveFilterCount() > 0 && (
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {(Object.keys(filters) as Array<keyof FilterState>).map(category =>
              filters[category].map(value => (
                <Chip
                  key={`${category}-${value}`}
                  label={getLabelForFilter(category, value)}
                  onDelete={() => handleRemoveFilter(category, value)}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))
            )}
            <Chip
              label="Clear All"
              onClick={handleClearFilters}
              size="small"
              color="default"
            />
          </Box>
        )}
      </Box>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={handleFilterClose}
        PaperProps={{
          sx: { width: 320, maxHeight: '80vh' }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t('home.filters.title')}
          </Typography>
          {(Object.keys(filterOptions) as Array<keyof typeof filterOptions>).map((category) => (
            <Accordion key={category} disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{t(`home.filters.${category}`)}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {filterOptions[category].map((option) => (
                    <FormControlLabel
                      key={option.key}
                      control={
                        <Checkbox
                          checked={filters[category].includes(option.key)}
                          onChange={() => handleFilterChange(category, option.key)}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          ))}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClearFilters} sx={{ mr: 1 }}>
              {t('home.filters.clear')}
            </Button>
            <Button variant="contained" onClick={handleFilterClose}>
              {t('home.filters.apply')}
            </Button>
          </Box>
        </Box>
      </Menu>

      {/* Search Results */}
      <Grid container spacing={3}>
        {filteredPartners.map((partner) => (
          <Grid item xs={12} sm={6} md={4} key={partner.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={partner.avatar}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  >
                    {partner.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {partner.name}
                    </Typography>
                    <Rating value={partner.rating} precision={0.5} readOnly size="small" />
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {partner.bio}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {partner.subjects.map((subject) => (
                    <Chip
                      key={subject}
                      label={getLabelForFilter('subjects', subject)}
                      size="small"
                      icon={<SchoolIcon />}
                    />
                  ))}
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      {getLabelForFilter('locations', partner.location)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      {partner.availability.map(time => 
                        getLabelForFilter('availability', time)
                      ).join(', ')}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LanguageIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      {partner.languages.map(lang => 
                        getLabelForFilter('languages', lang)
                      ).join(', ')}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" fullWidth>
                  Connect
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredPartners.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No study partners found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters or search query
          </Typography>
        </Box>
      )}
    </Container>
  );
} 