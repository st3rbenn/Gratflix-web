/** @type {import('next').NextConfig} */
const webpack = require("webpack")

const { parsed: localEnv } = require("dotenv").config({
	path:
		process.env.NODE_ENV === "production" ? ".env.production" : ".env.local",
})

const nextConfig = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ["@svgr/webpack"],
		})
		return config
	},

  images: {
    remotePatterns: [
      {
        //kelleyfrank.files.wordpress.com
        protocol: "https",
        hostname: "kelleyfrank.files.wordpress.com",
      },
      {
        //https://vanguardia.com.mx
        protocol: "https",
        hostname: "vanguardia.com.mx",
      }
    ]
  }
}

module.exports = nextConfig
