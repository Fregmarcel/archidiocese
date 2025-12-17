import type { NextConfig } from "next";

// We manage locales via the [locale] app route segment, without Next's i18n redirects.
const nextConfig: NextConfig = {
	eslint: {
		// Désactive ESLint lors du build de production (déploiement seulement)
		ignoreDuringBuilds: true,
	},
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
