# Perfect London Massage

Site Next.js 16 (App Router, TypeScript) pour **Perfect London Massage** — service de massage mobile à Londres.
Construit à partir du redesign Google Stitch (design system + composants) et des données réelles capturées sur
`https://perfectlondonmassage.co.uk/`.

## Stack

- Next.js 16.3 + React 19, TypeScript strict, Turbopack
- Design system **source TypeScript** dans `ds/components/*.tsx` (31 composants typés via `.d.ts` inlinés), importés directement par les composants site (`@/ds/components/…`)
- Tokens CSS dans `ds/tokens/*.css` (importés par `app/globals.css`)
- Pas de Tailwind — le design system fournit ses propres tokens CSS (`--cream-*`, `--emerald-*`, `--gold-*`, …)

## Design system : workflow

La source de vérité est le projet **Open Design** (`~/Library/Application Support/Open Design/namespaces/release-stable/data/projects/<id>/design-system`).
Pour synchroniser les edits :

```bash
# 1. copier les sources (composants + tokens) depuis Open Design
cp -R "<open-design>/design-system/components/." ds/components/
cp "<open-design>/design-system/tokens/"*.css ds/tokens/
# 2. supprimer les artefacts non-code (.jsx/.d.ts/prompt.md/html)
find ds/components \( -name "*.jsx" -o -name "*.d.ts" -o -name "*.prompt.md" -o -name "*.html" -o -name "*.artifact.json" \) -delete
# 3. convertir les .jsx vers .tsx typés
python3 live-site/scripts/convert-ds-to-tsx.py
```

Le script `convert-ds-to-tsx.py` inline les types `.d.ts` dans chaque `.tsx` (props typées, imports `.tsx`).

## Routes

| Route | Contenu |
|---|---|
| `/` | Home : hero, thérapeutes, 13 traitements, tarifs, travel supplements, reviews, FAQ |
| `/therapists/[slug]` | 29 fiches thérapeutes réelles (photo, drapeau, bio, services) |
| `/treatments/[slug]` | 13 pages traitements réelles (intro, bénéfices, tarifs, thérapeutes) |
| `/rates` | Tarifs réels (£65–£140) + travel supplement + late-night fee |
| `/contact` | Canaux réels (tél/WhatsApp/Telegram/email) + zone de service |
| `/console` | **Therapist console** (démo protégée par PIN) — dispatch, jobs, earnings, profil |
| `/demo` | Aperçu fidèle du design Stitch (switcher Home/Therapist/Treatment/Mobile) |

## Therapist console (`/console`)

Surface opérationnelle de démonstration (proposition du design system, n'existe pas encore sur le site live) :
vues Today (jobs + Accept/Decline), Schedule (grille hebdo), Earnings (KPIs + sessions), Profile.
**Accès protégé** par un code de démo (`lib/console-auth.ts`) pour ne pas exposer tout le produit :
code d'accès = **`2026`** (modifiable dans `lib/console-auth.ts`). Données fictives dans `lib/console-data.ts`.

| `/` | Home : hero, thérapeutes, 13 traitements, tarifs, travel supplements, reviews, FAQ |
| `/therapists/[slug]` | 29 fiches thérapeutes réelles (photo, drapeau, bio, services) |
| `/treatments/[slug]` | 13 pages traitements réelles (intro, bénéfices, tarifs, thérapeutes) |
| `/rates` | Tarifs réels (£65–£140) + travel supplement + late-night fee |
| `/contact` | Canaux réels (tél/WhatsApp/Telegram/email) + zone de service |
| `/demo` | Aperçu fidèle du design Stitch (switcher Home/Therapist/Treatment/Mobile) |

## Données réelles

- `live-site/data/treatments.json` — 13 traitements (intro + bénéfices + images) scrappés
- `live-site/data/therapists.json` — 29 thérapeutes (bio, services, dispo, drapeau, photo)
- `live-site/REFERENCE.md` — infos business complètes (contact, tarifs, FAQ, reviews)
- `live-site/assets/` — assets téléchargés (logos, photos, drapeaux, images traitements)
- `live-site/scripts/capture.mjs` — scraper réutilisable (`node live-site/scripts/capture.mjs`)

## Réservation

Les CTA pointent vers les canaux réels : `tel:+447904648403`, WhatsApp `wa.me/447386738553`,
Telegram `t.me/perfectlondonmassage`, email. Aucun formulaire côté serveur — le site réel réserve par SMS/tél/WhatsApp.

## Développement

```bash
npm run dev      # dev server
npm run build    # build production
npm run lint     # eslint
npx tsc --noEmit # typecheck
```
