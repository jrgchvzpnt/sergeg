import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Reemplaza 'nombre-de-tu-repositorio' con el nombre real que le pusiste en GitHub
export default defineConfig({
  plugins: [react()],
  base: '/sergeg/', 
})