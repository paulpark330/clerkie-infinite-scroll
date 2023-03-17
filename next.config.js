/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
};

module.exports = nextConfig;
