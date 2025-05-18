import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  useTheme,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Badge,
} from '@mui/material';
import {
  Group as GroupIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface FilterState {
  subjects: string[];
  locations: string[];
  availability: string[];
  languages: string[];
  studyStyles: string[];
}

export default function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useLanguage();

  // Filter states
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [filters, setFilters] = useState<FilterState>(() => {
    const savedFilters = localStorage.getItem('studyFilters');
    return savedFilters ? JSON.parse(savedFilters) : {
      subjects: [],
      locations: [],
      availability: [],
      languages: [],
      studyStyles: [],
    };
  });

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studyFilters', JSON.stringify(filters));
  }, [filters]);

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

  const features = [
    {
      title: t('home.findPartner.title'),
      description: t('home.findPartner.description'),
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      path: '/find-partner',
      color: theme.palette.primary.main,
    },
    {
      title: t('home.joinGroups.title'),
      description: t('home.joinGroups.description'),
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      path: '/find-group',
      color: theme.palette.secondary.main,
    },
  ];

  return (
    <Box>
      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 4, md: 6 },
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
          borderRadius: 3,
          mb: 4,
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <Badge
            badgeContent={getActiveFilterCount()}
            color="secondary"
            sx={{
              '& .MuiBadge-badge': {
                bgcolor: 'white',
                color: theme.palette.primary.main,
              }
            }}
          >
            <IconButton
              onClick={handleFilterClick}
              sx={{
                color: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <FilterListIcon />
            </IconButton>
          </Badge>
        </Box>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          {t('home.welcome')}, {currentUser?.displayName || 'Student'}!
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            opacity: 0.9,
            maxWidth: 600,
            mb: 3,
            textShadow: '0px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          {t('home.subtitle')}
        </Typography>
      </Paper>

      {/* Active Filters */}
      {getActiveFilterCount() > 0 && (
        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
        </Box>
      )}

      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={handleFilterClose}
        PaperProps={{
          sx: {
            mt: 1,
            width: 320,
            maxHeight: '80vh',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('home.filters.title')}
          </Typography>
          <Button color="primary" onClick={handleClearFilters} size="small">
            {t('home.filters.clear')}
          </Button>
        </Box>
        <Divider />
        {(Object.keys(filterOptions) as Array<keyof typeof filterOptions>).map((category) => (
          <Accordion key={category} disableGutters elevation={0}>
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
                        checked={filters[category as keyof FilterState].includes(option.key)}
                        onChange={() => handleFilterChange(category as keyof FilterState, option.key)}
                        size="small"
                      />
                    }
                    label={option.label}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        ))}
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleFilterClose}
          >
            {t('home.filters.apply')}
          </Button>
        </Box>
      </Menu>

      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} md={6} key={feature.title}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                },
              }}
              onClick={() => navigate(feature.path)}
            >
              <Box 
                sx={{ 
                  display: 'inline-flex',
                  p: 1.5,
                  borderRadius: 2,
                  color: feature.color,
                  bgcolor: `${feature.color}15`,
                  mb: 2,
                }}
              >
                {feature.icon}
              </Box>
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                {feature.title}
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                {feature.description}
              </Typography>
              <Button
                variant="outlined"
                size="large"
                sx={{ 
                  mt: 'auto',
                  borderColor: feature.color,
                  color: feature.color,
                  '&:hover': {
                    borderColor: feature.color,
                    bgcolor: `${feature.color}10`,
                  },
                }}
              >
                {t('home.getStarted')}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 