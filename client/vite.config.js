import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  server:{
    proxy:{
      '/api':{
        target:  'http://enpointeassignment-production-3a0d.up.railway.app',  //Should be kept in .env
        //localhost:3002 //enpointeassignment-production-3a0d.up.railway.app http://enpointeassignment-production-3a0d.up.railway.app
        secure:false,
      },
    }
  },

  plugins: [react()],
})
