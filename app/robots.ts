import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://perfectlondonmassage.co.uk";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Traditional search engines
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/console"],
      },
      // OpenAI — ChatGPT Search, real-time browsing & user-initiated browsing
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      // Anthropic — Claude web search
      { userAgent: "ClaudeBot", allow: "/" },
      // Perplexity — answer engine
      { userAgent: "PerplexityBot", allow: "/" },
      // Google — AI Overviews & Gemini
      { userAgent: "Google-Extended", allow: "/" },
      // Apple — Siri & Apple Intelligence
      { userAgent: "Applebot-Extended", allow: "/" },
      // Microsoft — Copilot & Bing Chat
      { userAgent: "Bingbot", allow: "/" },
      // Meta — Llama / AI assistant browsing
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
      // ByteDance — Doubao
      { userAgent: "Bytespider", allow: "/" },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
