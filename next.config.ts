import MillionLint from "@million/lint";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.qrserver.com",
        port: "",
        pathname: "/v1/create-qr-code/**",
      },
      {
        protocol: "https",
        hostname: "chart.googleapis.com",
        port: "",
        pathname: "/chart/**",
      },
    ],
  },
};

export default MillionLint.next({
  enabled: true,
  rsc: true,
})(nextConfig);
