import type { NextConfig } from "next";

// We manage locales via the [locale] app route segment, without Next's i18n redirects.
const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
	},
};

export default nextConfig;
