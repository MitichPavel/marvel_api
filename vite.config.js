import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@services": "/src/services",
      "@pages": "/src/pages",
      "@helpers": "/src/helpers",
      "@style": "/src/style",
      "@utils": "/src/utils",
    },
  },
});
