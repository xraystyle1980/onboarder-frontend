# Vercel Environment Variables Setup

## 🔑 **Required Environment Variables for Vercel**

### **1. Vite Public Builder Key**
```
VITE_PUBLIC_BUILDER_KEY=your_vite_public_builder_key_here
```

### **2. API Configuration**
```
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

### **3. Supabase Configuration**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 🚀 **How to Add Environment Variables in Vercel**

### **Method 1: Vercel Dashboard**
1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Name**: `VITE_PUBLIC_BUILDER_KEY`
   - **Value**: Your Vite public builder key
   - **Environment**: Production, Preview, Development
4. Repeat for all variables above

### **Method 2: Vercel CLI**
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variables
vercel env add VITE_PUBLIC_BUILDER_KEY
vercel env add VITE_API_BASE_URL
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

### **Method 3: .env.local (for local development)**
Create `onboarder-frontend/.env.local`:
```bash
VITE_PUBLIC_BUILDER_KEY=your_vite_public_builder_key_here
VITE_API_BASE_URL=http://localhost:3001/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 🔧 **Vite Configuration for Vercel**

### **Update vite.config.ts (if needed):**
```typescript
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";
import vitePluginInjectDataLocator from "./plugins/vite-plugin-inject-data-locator";

export default defineConfig({
  plugins: [react(), vitePluginInjectDataLocator()],
  server: {
    allowedHosts: true,
  },
  // Add this for Vercel deployment
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
```

## 📋 **Deployment Checklist**

- [ ] Add `VITE_PUBLIC_BUILDER_KEY` to Vercel environment variables
- [ ] Add `VITE_API_BASE_URL` pointing to your deployed backend
- [ ] Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [ ] Ensure backend is deployed and accessible
- [ ] Test the deployment with a preview URL
- [ ] Verify all API calls work in production

## 🎯 **Important Notes**

1. **Vite Public Builder Key**: This is required for Vite applications on Vercel
2. **API Base URL**: Must point to your deployed backend (not localhost)
3. **Environment**: Set variables for Production, Preview, and Development
4. **Redeploy**: After adding environment variables, redeploy your application

## 🔍 **Troubleshooting**

### **If build fails:**
- Check that all environment variables are set
- Verify the Vite public builder key is correct
- Ensure backend URL is accessible

### **If API calls fail:**
- Verify `VITE_API_BASE_URL` points to correct backend
- Check CORS settings in your backend
- Ensure backend is deployed and running 