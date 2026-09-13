import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Paksa workspace root ke folder proyek ini supaya Next.js tidak
    // salah pilih lockfile (warning D:\laragon\www\package-lock.json).
    root: path.join(__dirname),
  },
};

export default nextConfig;
