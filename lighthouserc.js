module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/what-i-do',
        'http://localhost:3000/projects',
        'http://localhost:3000/experience',
        'http://localhost:3000/contact',
      ],
      startServerCommand: 'npm run build && npm run start',
      startServerReadyPattern: /listening|ready|started/i,
      startServerReadyTimeout: 60000,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
