export const colors = {
  primary: '#1a237e',
  primaryLight: '#534bae',
  primaryDark: '#000051',
  secondary: '#f5f5f5',
  white: '#ffffff',
  black: '#000000',
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#999999',
  },
  error: '#d32f2f',
  success: '#388e3c',
  warning: '#f57c00',
  background: {
    light: '#ffffff',
    dark: '#f5f5f5',
  },
  border: '#e0e0e0',
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  body1: {
    fontSize: 16,
    color: colors.text.primary,
  },
  body2: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  caption: {
    fontSize: 12,
    color: colors.text.light,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const shadows = {
  small: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  large: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 30,
  full: 9999,
};

export const gradients = {
  primary: ['#ffffff', '#f5f5f5'],
  secondary: ['#1a237e', '#534bae'],
}; 