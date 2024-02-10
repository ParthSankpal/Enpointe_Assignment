import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  server:{
    proxy:{
      '/api':{
        target:  'http://enpointeassignment-production.up.railway.app',  //Should be kept in .env
        //localhost:3002
        secure:false,
      },
    }
  },

  plugins: [react()],
})
