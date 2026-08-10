# Perfect London Massage — SEO / GEO Roadmap (30/60/90)

> Document de travail pour le client (via Michael). Le site vitrine de démonstration est
> déployé sur **https://plm.memolabs.dev** (VPS perso, pas le domaine du client).
> `metadataBase`/sitemap/canonicals pointent vers `perfectlondonmassage.co.uk` (domaine cible)
> afin que la bascule soit immédiate si le client investit dans un nouveau site.

## Objectif

Être **à la pointe en référencement** (SEO + AI/LLM visibility) sans nécessairement refondre
tout le site. Deux surfaces :
1. **Site WordPress actuel** (perfectlondonmassage.co.uk) — le client le garde → recommandations actionnables.
2. **Vitrine Next.js** (plm.memolabs.dev) — preuve de concept déployée, SEO de pointe déjà implémenté.

---

## 1. Ce qui est DÉJÀ en place (vitrine Next.js, déployé)

| Brique SEO | Détail |
|---|---|
| AI crawlers (robots.txt) | GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot, Meta-ExternalAgent, Bytespider |
| sitemap.xml | 45 URLs (home, rates, contact, 13 traitements, 29 thérapeutes) |
| llms.txt | Format llmstxt.org — summary + 13 traitements + 29 thérapeutes + contact |
| JSON-LD | HealthAndBeautyBusiness + AggregateRating + FAQPage (home), Service+Offer (traitement), Person (thérapeute), BreadcrumbList (détails) |
| Metadata | Titles/descriptions/OG/canonicals par route, metadataBase → domaine client |
| Performance | next/font self-hosted (0 CLS font), next/image LCP, WebP (22MB→5.7MB), SSG statique, Docker standalone |
| Sécurité | HSTS, nosniff, DENY, Referrer-Policy, Permissions-Policy, HTTP/3 |
| Console thérapeute | /console (accès PIN, noindex) |

---

## 2. Plan d'action 30 jours — WordPress live (le client garde son site)

| # | Action | Effort | Impact |
|---|---|---|---|
| 1 | Configurer **llms.txt** sur WP (plugin ou fichier racine) | 1h | AI visibility |
| 2 | Enrichir schema **Rank Math** : LocalBusiness complet (address, geo, zones) + Service par traitement + FAQ | 4h | Rich results |
| 3 | **Google Business Profile** : vérifier fiche, catégorie, zones desservies, horaires, lien booking | 2h | SEO local |
| 4 | **AggregateRating** avec les reviews existantes | 1h | E-E-A-T / stars |
| 5 | Page traitements : titles/descriptions keywordées + H1-H2 + intro "answer-first" (1-2 phrases citables) | 6h | Featured snippets |
| 6 | Audit vitesse WP (caching, images WebP, lazy load) | 3h | CWV |

## 3. Plan 60 jours — contenu & autorité

| # | Action | Impact |
|---|---|---|
| 1 | Blog : calendrier 10-15 sujets "mobile massage London" (question-format) | Featured snippets + AI citations |
| 2 | Pages thérapeutes : bio E-E-A-T, qualifications, schéma Person complet | Autorité |
| 3 | Reviews : stratégie d'encouragement + schema Review | E-E-A-T |
| 4 | Backlinks locaux (annuaires, presse locale, partenaires hôtels) | Autorité |

## 4. Plan 90 jours — décision nouveau site

| Scénario | Action |
|---|---|
| Le client investit dans un **nouveau site** | Migrer la vitrine plm.memolabs.dev → perfectlondonmassage.co.uk (domaine, DNS, SSL). SEO déjà 100% prêt. |
| Le client reste sur **WordPress** | Appliquer les recommandations 30/60 jours + maintenir (le plan fonctionne aussi sur WP). |

---

## 5. Leviers de négociation (pour Michael)

1. **Preuve vivante** : la vitrine déployée montre un référencement de pointe immédiatement visible
   (AI crawlers, llms.txt, schema riche, WebP, vitesse).
2. **Risque faible** : rien n'est cassé sur le site actuel — le plan est applicable en continu.
3. **Double voie** : que le client investisse dans un nouveau site ou non, le référencement s'améliore.
4. **Métriques mesurables** : sitemap, schema valides, CWV, présence AI.

## Liens

- Vitrine : https://plm.memolabs.dev
- Console (PIN démo) : https://plm.memolabs.dev/console
- Repo : https://github.com/guillaume-flambard/perfect-london-massage
- Audit technique : `live-site/SEO-AUDIT.md`
