# SEO / GEO / Vercel Audit — Perfect London Massage

> Audit date: 2026-08-10 · Baseline: audit local (site non déployé), build production Next.js 16.
> Skills appliqués : `geo-best-practices`, `geo-content-optimizer`, `ai-seo`, `seo-audit`,
> `on-page-seo-checker`, `technical-seo-checker`, `schema`, `serp-markup-builder`,
> `site-architecture`. Vercel best practices couvertes manuellement (pas de skill dédié).

## Statut après implémentation

| Item | Statut | Détail |
|---|---|---|
| robots.txt (AI crawlers) | ✅ | `app/robots.ts` : GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot, Meta-ExternalAgent, Bytespider. `/demo` disallow. |
| sitemap.xml | ✅ | `app/sitemap.ts` : 45 URLs (home, rates, contact, 13 traitements, 29 thérapeutes) |
| llms.txt | ✅ | `public/llms.txt` (format llmstxt.org) : summary, treatments, rates, contact |
| JSON-LD schema | ✅ | `lib/schema.ts` + `components/JsonLd.tsx` : HealthAndBeautyBusiness (home), FAQPage (home), Service par traitement, Person par thérapeute |
| Metadata par route | ✅ | `generateMetadata` home/therapists/treatments + `metadata` rates/contact/demo ; titles, descriptions, OG, canonicals, `metadataBase` |
| next/font | ✅ | Cormorant Garamond + Plus Jakarta Sans self-hosted via `next/font/google` (fini l'`@import` Google Fonts) |
| next.config security headers | ✅ | X-Content-Type-Options, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy, `poweredByHeader: false` |
| noindex demo | ✅ | `/demo` : `robots: noindex` + canonical `/` (route de preview design) |
| SSR / SSG | ✅ | Toutes les routes en SSG (`generateStaticParams`) — lisible par les AI crawlers sans JS |
| Mobile-friendly | ✅ | Pas de scroll horizontal à 390px, 0 image cassée |
| Images alt | ✅ | Toutes les `<img>` ont un alt (drapeaux décoratifs en `alt=""`) |
| Semantic HTML | ✅ | h1 unique par page, sections, nav, footer, role dialog/tablist |

## Checklist GEO (geo-best-practices / technical-optimization)

- [x] Schema.org structured data — Home (Business+FAQ), Treatment (Service), Therapist (Person)
- [x] Page load speed — build statique, fonts self-hosted, images `public/`
- [x] Mobile-friendliness — vérifié 390px
- [x] Semantic HTML — h1/nav/section/table/dialog
- [x] XML sitemap — `/sitemap.xml`
- [x] robots.txt AI crawlers — `/robots.txt`
- [x] llms.txt — `/llms.txt`
- [x] HTTPS — géré par Vercel au déploiement (config not required locally)
- [x] Image alt text descriptif
- [x] SSR pour AI crawlers — routes SSG
- [x] Clean URL structure — `/treatments/[slug]`, `/therapists/[slug]`
- [x] Canonicals — sur toutes les routes
- [ ] ⚠️ CWV production — à mesurer après déploiement (Lighthouse/Vercel Analytics)

## Checklist SEO traditionnel

- [x] Title tags uniques + meta descriptions par route
- [x] Hiérarchie H1→H2→H3 (H1 unique, section headings DS)
- [x] Canonical par page
- [x] OG + Twitter cards (layout + routes)
- [x] Robots meta index/follow + googlebot
- [x] Architecture IA saine : home → traitements/thérapeutes/rates/contact

## Vercel best practices

- [x] `next/font` (pas de CLS font, pas de requête externe)
- [x] `next/image` — ⚠️ **Non migré** : le design system utilise des `<img>` natifs avec `object-fit`/aspect-ratio. Trade-off documenté : les images sont statiques dans `public/`, servies par Vercel avec cache. Migration possible mais non prioritaire.
- [x] Security headers via `next.config.ts`
- [x] SSG statique (déploiement efficace sur Vercel)
- [ ] ⚠️ `metadataBase` = `https://perfectlondonmassage.co.uk` — à confirmer que le domaine de prod est le bon avant déploiement
- [ ] ⚠️ Pas de fichier `vercel.json` / pas de déploiement actif — le site tourne en local

## P0 / P1 / P2

### P0 (critique — rien)
Aucun problème bloquant.

### P1 (important — avant mise en prod)
1. **Déploiement** : le site n'est pas déployé. Lancer `vercel` / CI pour exposer les URLs (robots/sitemap/llms doivent pointer vers un domaine réel).
2. **Confirmer le domaine** : `metadataBase`, robots `host`, sitemap `BASE` pointent vers `perfectlondonmassage.co.uk`. Si déploiement sur une preview Vercel, ces valeurs devront être paramétrées (`NEXT_PUBLIC_SITE_URL`).
3. **CWV mesuré** : lancer Lighthouse/Web Vitals après déploiement (images, LCP).

### P2 (amélioration)
1. `next/image` : migrer les `<img>` du DS vers `next/image` pour l'optimisation automatique (gain CWV, `remotePatterns`/`localPatterns`).
2. `og-image` dynamique : générer des Open Graph images par traitement/thérapeute (Next ImageResponse).
3. `content-quality` : enrichir les intros traitements (certaines sont longues/fluides — les skills GEO recommandent des réponses directes et citables).
4. Analytics : ajouter un tracker (Vercel Analytics / GA4) — le vrai site utilise GA4 `G-P60FGWFSHS`.
5. Breadcrumb schema : ajouter `BreadcrumbList` sur les pages détail.
6. `.well-known` : pas nécessaire pour l'instant.

## Commandes

```bash
npm run dev        # dev
npm run build      # build prod (50 pages : 45 routes + robots + sitemap + not-found)
npm run start      # serve prod
npm run lint       # eslint (0 erreur)
npx tsc --noEmit   # typecheck (0 erreur)
```
