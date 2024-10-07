module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
  
    // A setup file that adds custom Jest matchers from jest-dom
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
    // Transform configuration for handling different file types
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  
    // Supported file extensions for modules
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  };
  