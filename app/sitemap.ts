import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://kilalabest.cn",
      lastModified: new Date().toISOString(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: "https://kilalabest.cn/RMT",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://kilalabest.cn/RMT/RemAbsorb",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.6,
    },
  ];
}
