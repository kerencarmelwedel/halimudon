import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Container,
  useTheme,
  Menu,
  MenuItem,
  Divider,
  Switch,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  Group as GroupIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  Translate as TranslateIcon,
  LocationOn as LocationIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export default function Layout({ children, darkMode, setDarkMode }: LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const [locationEnabled, setLocationEnabled] = useState(localStorage.getItem('locationEnabled') === 'true');
  
  const { currentUser, logout } = useAuth();
  const { language, setLanguage, t, dir } = useLanguage();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleProfile = () => {
    navigate('/profile');
    handleProfileMenuClose();
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
  };

  const handleLocationToggle = () => {
    const newLocationEnabled = !locationEnabled;
    setLocationEnabled(newLocationEnabled);
    localStorage.setItem('locationEnabled', String(newLocationEnabled));
  };

  const handleLanguageChange = (event: any) => {
    setLanguage(event.target.value);
  };

  const menuItems = [
    { text: t('nav.findPartner'), icon: <SearchIcon />, path: '/find-partner' },
    { text: t('nav.findGroup'), icon: <GroupIcon />, path: '/find-group' },
  ];

  return (
    <Box sx={{ display: 'flex', direction: dir() }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          backgroundColor: darkMode ? 'background.paper' : 'background.paper',
          borderBottom: `1px solid ${theme.palette.divider}`,
          backdropFilter: 'blur(8px)',
          boxShadow: darkMode ? 'none' : '0px 1px 3px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', height: 70 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="primary"
                edge="start"
                onClick={() => setDrawerOpen(true)}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography 
                variant="h6" 
                component={Link} 
                to="/"
                sx={{ 
                  color: darkMode ? 'white' : 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 700,
                  letterSpacing: '-0.5px',
                }}
              >
                Halimudon
              </Typography>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 4 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    startIcon={item.icon}
                    component={Link}
                    to={item.path}
                    sx={{ 
                      ml: 2,
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={handleProfileMenuOpen}
                sx={{ ml: 2 }}
              >
                <Avatar
                  sx={{
                    width: 35,
                    height: 35,
                    bgcolor: 'secondary.main',
                  }}
                >
                  {currentUser?.displayName?.[0] || currentUser?.email?.[0] || 'U'}
                </Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 320,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {currentUser?.displayName || t('profile.userProfile')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentUser?.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('nav.profile')} />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            {t('nav.settings')}
          </Typography>
        </MenuItem>
        <Box sx={{ px: 2, py: 1.5 }}>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={handleDarkModeToggle}
                size="small"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DarkModeIcon sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2">{t('settings.darkMode')}</Typography>
              </Box>
            }
          />
          <FormControlLabel
            control={
              <Switch
                checked={locationEnabled}
                onChange={handleLocationToggle}
                size="small"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationIcon sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2">{t('settings.location')}</Typography>
              </Box>
            }
          />
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
            <TranslateIcon sx={{ mr: 1, fontSize: 20 }} />
            <FormControl size="small" fullWidth>
              <InputLabel>{t('settings.language')}</InputLabel>
              <Select
                value={language}
                label={t('settings.language')}
                onChange={handleLanguageChange}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="he">עברית</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('nav.logout')} />
        </MenuItem>
      </Menu>

      <Drawer
        anchor={dir() === 'rtl' ? 'right' : 'left'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            {t('nav.menu')}
          </Typography>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text}
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
              sx={{
                borderRadius: 1,
                mx: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'primary.main' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: 500,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
    </Box>
  );
} 