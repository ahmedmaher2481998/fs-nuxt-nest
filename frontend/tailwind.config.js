export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './app/**/*.{js,vue,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#006c4e',
          dark: '#005a3f',
          light: '#008c66',
        },
        secondary: {
          DEFAULT: '#f5f5f5',
          dark: '#e8e8e8',
        },
        success: '#28a745',
        warning: {
          DEFAULT: '#ffc107',
          light: '#fff3cd',
          dark: '#856404',
          border: '#ffeaa7',
        },
        danger: {
          DEFAULT: '#dc3545',
          light: '#f8d7da',
          dark: '#721c24',
          border: '#f5c6cb',
        },
        border: '#d4d4d4',
        text: {
          DEFAULT: '#1a1a1a',
          secondary: '#555',
          muted: '#666',
        },
        background: {
          DEFAULT: '#fafafa',
          card: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Noto Sans Arabic', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'btn-hover': '0 4px 8px rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        DEFAULT: '8px',
        card: '8px',
        badge: '20px',
      },
      backgroundColor: {
        'status-pending': '#fff3cd',
        'status-approved': '#d4edda',
        'status-rejected': '#f8d7da',
      },
      borderColor: {
        'status-pending': '#ffeaa7',
        'status-approved': '#c3e6cb',
        'status-rejected': '#f5c6cb',
      },
      textColor: {
        'status-pending': '#856404',
        'status-approved': '#155724',
        'status-rejected': '#721c24',
      },
    },
  },
  plugins: [],
}
