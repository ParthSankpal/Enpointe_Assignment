import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  server:{
    proxy:{
      '/api':{
        target:  'http://localhost:3002',  //Should be kept in .env
        //localhost:3002 //enpointeassignment-production-922f.up.railway.app
        secure:false,
      },
    }
  },

  plugins: [react()],
})
