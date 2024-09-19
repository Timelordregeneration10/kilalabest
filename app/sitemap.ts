import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://kilalabest.cn",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://kilalabest.cn/RMT",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://kilalabest.cn/project",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://kilalabest.cn/application",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://kilalabest.cn/attempt",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://kilalabest.cn/music",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://kilalabest.cn/anime",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://kilalabest.cn/game",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://kilalabest.cn/drawing",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}
