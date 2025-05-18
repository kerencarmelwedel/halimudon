interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  en: {
    // Navigation
    'nav.findPartner': 'Find Partner',
    'nav.findGroup': 'Join Groups',
    'nav.profile': 'My Profile',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    'nav.menu': 'Menu',

    // Home
    'home.welcome': 'Welcome back',
    'home.subtitle': 'Ready to enhance your learning journey? Choose how you\'d like to study today.',
    'home.findPartner.title': 'Find a Study Partner',
    'home.findPartner.description': 'Connect with someone who shares your learning goals and schedule.',
    'home.joinGroups.title': 'Join Study Groups',
    'home.joinGroups.description': 'Learn and grow together with like-minded students in group sessions.',
    'home.getStarted': 'Get Started',
    'home.filters.title': 'Filters',
    'home.filters.subject': 'Subject',
    'home.filters.location': 'Location',
    'home.filters.availability': 'Availability',
    'home.filters.language': 'Language',
    'home.filters.studyStyle': 'Study Style',
    'home.filters.apply': 'Apply Filters',
    'home.filters.clear': 'Clear',

    // Filter Options
    'filters.subjects.math': 'Mathematics',
    'filters.subjects.physics': 'Physics',
    'filters.subjects.chemistry': 'Chemistry',
    'filters.subjects.biology': 'Biology',
    'filters.subjects.computerScience': 'Computer Science',
    'filters.subjects.literature': 'Literature',
    'filters.subjects.history': 'History',
    'filters.subjects.economics': 'Economics',

    'filters.locations.online': 'Online',
    'filters.locations.library': 'Library',
    'filters.locations.campus': 'Campus',
    'filters.locations.cafe': 'Café',

    'filters.availability.weekdayMornings': 'Weekday Mornings',
    'filters.availability.weekdayAfternoons': 'Weekday Afternoons',
    'filters.availability.weekdayEvenings': 'Weekday Evenings',
    'filters.availability.weekends': 'Weekends',

    'filters.languages.english': 'English',
    'filters.languages.hebrew': 'Hebrew',
    'filters.languages.arabic': 'Arabic',
    'filters.languages.russian': 'Russian',

    'filters.studyStyles.visual': 'Visual Learning',
    'filters.studyStyles.auditory': 'Auditory Learning',
    'filters.studyStyles.handson': 'Hands-on Learning',
    'filters.studyStyles.reading': 'Reading/Writing',
    'filters.studyStyles.group': 'Group Discussion',

    // Settings
    'settings.darkMode': 'Dark Mode',
    'settings.location': 'Location Services',
    'settings.language': 'Language',

    // Profile Menu
    'profile.settings': 'Settings',
    'profile.userProfile': 'User Profile',
    'profile.title': 'Profile',
    'profile.displayName': 'Display Name',
    'profile.bio': 'Bio',
    'profile.subjects': 'Subjects (comma separated)',
    'profile.subjects.placeholder': 'e.g., Mathematics, Physics, Computer Science',
    'profile.location': 'Preferred Location',
    'profile.location.placeholder': 'Online or specific location',
    'profile.availability': 'Availability',
    'profile.availability.placeholder': 'e.g., Weekdays evenings, Weekends',
    'profile.save': 'Save Profile',
    'profile.success': 'Profile updated successfully!',
    'profile.error': 'Failed to update profile',

    // Auth
    'auth.login.title': 'Sign in',
    'auth.login.email': 'Email Address',
    'auth.login.password': 'Password',
    'auth.login.submit': 'Sign In',
    'auth.login.google': 'Sign in with Google',
    'auth.login.signup': 'Don\'t have an account? Sign Up',
    'auth.login.error': 'Failed to sign in',
    'auth.login.or': 'or',

    'auth.signup.title': 'Sign Up',
    'auth.signup.displayName': 'Display Name',
    'auth.signup.email': 'Email Address',
    'auth.signup.password': 'Password',
    'auth.signup.confirmPassword': 'Confirm Password',
    'auth.signup.submit': 'Sign Up',
    'auth.signup.google': 'Sign up with Google',
    'auth.signup.login': 'Already have an account? Sign In',
    'auth.signup.error': 'Failed to create an account',
    'auth.signup.passwordMatch': 'Passwords do not match',
    'auth.signup.or': 'or'
  },
  he: {
    // Navigation
    'nav.findPartner': 'מצא שותף',
    'nav.findGroup': 'הצטרף לקבוצות',
    'nav.profile': 'הפרופיל שלי',
    'nav.settings': 'הגדרות',
    'nav.logout': 'התנתק',
    'nav.menu': 'תפריט',

    // Home
    'home.welcome': 'ברוך הבא',
    'home.subtitle': 'מוכן לשפר את חווית הלמידה שלך? בחר איך תרצה ללמוד היום.',
    'home.findPartner.title': 'מצא שותף ללימודים',
    'home.findPartner.description': 'התחבר עם מישהו שחולק את מטרות הלמידה והלוח זמנים שלך.',
    'home.joinGroups.title': 'הצטרף לקבוצות לימוד',
    'home.joinGroups.description': 'למד והתפתח יחד עם סטודנטים בעלי תחומי עניין משותפים.',
    'home.getStarted': 'בוא נתחיל',
    'home.filters.title': 'סינון',
    'home.filters.subject': 'נושא',
    'home.filters.location': 'מיקום',
    'home.filters.availability': 'זמינות',
    'home.filters.language': 'שפה',
    'home.filters.studyStyle': 'סגנון לימוד',
    'home.filters.apply': 'החל סינון',
    'home.filters.clear': 'נקה',

    // Filter Options
    'filters.subjects.math': 'מתמטיקה',
    'filters.subjects.physics': 'פיזיקה',
    'filters.subjects.chemistry': 'כימיה',
    'filters.subjects.biology': 'ביולוגיה',
    'filters.subjects.computerScience': 'מדעי המחשב',
    'filters.subjects.literature': 'ספרות',
    'filters.subjects.history': 'היסטוריה',
    'filters.subjects.economics': 'כלכלה',

    'filters.locations.online': 'מקוון',
    'filters.locations.library': 'ספרייה',
    'filters.locations.campus': 'קמפוס',
    'filters.locations.cafe': 'בית קפה',

    'filters.availability.weekdayMornings': 'בקרים באמצע השבוע',
    'filters.availability.weekdayAfternoons': 'צהריים באמצע השבוע',
    'filters.availability.weekdayEvenings': 'ערבים באמצע השבוע',
    'filters.availability.weekends': 'סופי שבוע',

    'filters.languages.english': 'אנגלית',
    'filters.languages.hebrew': 'עברית',
    'filters.languages.arabic': 'ערבית',
    'filters.languages.russian': 'רוסית',

    'filters.studyStyles.visual': 'למידה חזותית',
    'filters.studyStyles.auditory': 'למידה שמיעתית',
    'filters.studyStyles.handson': 'למידה מעשית',
    'filters.studyStyles.reading': 'קריאה/כתיבה',
    'filters.studyStyles.group': 'דיון קבוצתי',

    // Settings
    'settings.darkMode': 'מצב כהה',
    'settings.location': 'שירותי מיקום',
    'settings.language': 'שפה',

    // Profile Menu
    'profile.settings': 'הגדרות',
    'profile.userProfile': 'פרופיל משתמש',
    'profile.title': 'פרופיל',
    'profile.displayName': 'שם תצוגה',
    'profile.bio': 'ביוגרפיה',
    'profile.subjects': 'נושאים (מופרדים בפסיקים)',
    'profile.subjects.placeholder': 'לדוגמה: מתמטיקה, פיזיקה, מדעי המחשב',
    'profile.location': 'מיקום מועדף',
    'profile.location.placeholder': 'מקוון או מיקום ספציפי',
    'profile.availability': 'זמינות',
    'profile.availability.placeholder': 'לדוגמה: ערבי שבוע, סופי שבוע',
    'profile.save': 'שמור פרופיל',
    'profile.success': 'הפרופיל עודכן בהצלחה!',
    'profile.error': 'עדכון הפרופיל נכשל',

    // Auth
    'auth.login.title': 'התחברות',
    'auth.login.email': 'כתובת אימייל',
    'auth.login.password': 'סיסמה',
    'auth.login.submit': 'התחבר',
    'auth.login.google': 'התחבר עם Google',
    'auth.login.signup': 'אין לך חשבון? הירשם',
    'auth.login.error': 'ההתחברות נכשלה',
    'auth.login.or': 'או',

    'auth.signup.title': 'הרשמה',
    'auth.signup.displayName': 'שם תצוגה',
    'auth.signup.email': 'כתובת אימייל',
    'auth.signup.password': 'סיסמה',
    'auth.signup.confirmPassword': 'אימות סיסמה',
    'auth.signup.submit': 'הירשם',
    'auth.signup.google': 'הירשם עם Google',
    'auth.signup.login': 'כבר יש לך חשבון? התחבר',
    'auth.signup.error': 'יצירת החשבון נכשלה',
    'auth.signup.passwordMatch': 'הסיסמאות אינן תואמות',
    'auth.signup.or': 'או'
  },
}; 