import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  const config: any = {
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        "@icons": fileURLToPath(
          new URL("./node_modules/pixelarticons/svg", import.meta.url)
        ),
      },
    },
  };

  if (isBuild) {
    config.build = {
      assetsInlineLimit: 0,
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "YiPixelComponent",
        fileName: (format: string) => `yi-pixel-component.${format}.js`,
        formats: ["es"],
      },
      outDir: "dist",
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    };
  }

  return config;
});
