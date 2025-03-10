/// <reference types="vitest" />
/// <reference types="vitest/config" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'; // <-- Change this import

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',

  },
});

