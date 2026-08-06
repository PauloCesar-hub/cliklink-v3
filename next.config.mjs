/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://images.unsplash.com",
      "connect-src 'self' https://viacep.com.br",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/araraquara", destination: "/", permanent: true },
      { source: "/araraquara/", destination: "/", permanent: true },
      { source: "/araraquara/sobre", destination: "/", permanent: true },
      { source: "/araraquara/sobre/", destination: "/", permanent: true },
      { source: "/araraquara/condominios", destination: "/condominios", permanent: true },
      { source: "/araraquara/condominios/", destination: "/condominios", permanent: true },
      { source: "/araraquara/tv-hd", destination: "/planos", permanent: true },
      { source: "/araraquara/tv-hd/", destination: "/planos", permanent: true },
      { source: "/araraquara/assine", destination: "/planos", permanent: true },
      { source: "/araraquara/assine/", destination: "/planos", permanent: true },
      { source: "/araraquara/atendimento", destination: "/suporte", permanent: true },
      { source: "/araraquara/atendimento/", destination: "/suporte", permanent: true },
    ];
  },
};

export default nextConfig;
