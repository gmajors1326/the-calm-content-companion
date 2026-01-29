/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure output to 'export' to generate static HTML/CSS/JS in the 'out' directory,
  // which might satisfy Vercel's expectation for a specific output folder structure.
  output: 'export', 
  distDir: 'public',
};

module.exports = nextConfig;