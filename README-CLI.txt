RELIC CASTLE CARDS — LOCAL CLI PATCH
=====================================

RESTORE POINT
The exact files uploaded before this patch are stored separately in:
RELIC-CASTLE-RESTORE-POINT-12SEP2026.zip

FILES THIS PATCH REPLACES
layout/theme.liquid
assets/relic-castle.css
assets/section-multicolumn.css
sections/rich-text.liquid
sections/custom-live-stage.liquid
sections/multicolumn.liquid
config/settings_schema.json
templates/index.json

FILES INTENTIONALLY NOT MODIFIED
assets/base.css
sections/header.liquid
sections/video.liquid
config/settings_data.json

WHY
- base.css remains Shopify Publisher's native foundation.
- header.liquid already uses native Shopify search/account/cart routes and inline theme icon assets; styling belongs in relic-castle.css.
- video.liquid already uses native section padding settings correctly; the conflicting hard-coded spacing was in relic-castle.css.
- settings_data.json is Theme Editor-generated. Avoid pushing it over the live store unless you explicitly intend to replace merchant settings.

WHAT CHANGED
1. Global world/background
   - Adds Theme Settings > Relic Castle atmosphere image pickers.
   - Adds darkness, atmosphere strength, and section-surface opacity controls.
   - Adds a real .relic-world layer instead of negative-z-index body pseudo-elements.
   - Existing relic-atmosphere.svg, relic-arch.svg and relic-sand-drift.svg remain fallback atmosphere layers.

2. Native spacing
   - Removes hard-coded outer Live Vault padding from relic-castle.css.
   - Rich Text keeps only Shopify section padding rules in its section-local style block.
   - Custom Live Stage now gets native color scheme/full-width/top/bottom padding settings.

3. Multicolumn architecture
   - Chase Archive remains Chase mode.
   - How It Works, Community Pulls / Relic Standard, and Trust are normal Shopify Multicolumn sections instead of pretending to be Chase cards.
   - Adapt ratios are calculated per block, not by the tallest/widest image in the entire row.
   - Removes duplicate slider class.
   - Optimizes Chase responsive image ceilings.

4. Chase collectible controls
   - 33%, 50%, 78%, 100% width classes now have actual CSS.
   - 5:7 = contained Pokemon card presentation.
   - Square = intentional crop.
   - Adapt = intrinsic/no-crop.
   - Only the collectible protector is rounded; outer Relic slab stays sharp.
   - Removes stale --pc-info-height dependency that referenced a nonexistent helper script.

5. Header actions
   - Search/account/cart keep native Liquid and Shopify routes.
   - relic-castle.css gives those native controls a compact restrained liquid-glass shell.

6. Featured Collection
   - Uses CSS flex stretching so cards in each row match the tallest card without fixed heights or JS.

SAFE CLI WORKFLOW
1. Work in the real local Shopify theme directory.
2. Make a git commit or copy before applying this patch.
3. Copy the patch files into the matching paths.
4. Run:
     shopify theme check
5. Run local preview:
     shopify theme dev --store YOUR-STORE.myshopify.com
6. Open the localhost URL Shopify CLI prints (commonly http://127.0.0.1:9292/).
7. In Theme Editor / local preview, set:
     Theme settings > Relic Castle atmosphere > Desktop desert / ruins background
   Optional mobile image can be left blank.
8. Start with:
     Background darkness: 50%
     Atmosphere strength: 90%
     Section surface opacity: 55%
9. Test native padding sliders on Live Break Rich Text, Video, Multicolumn, Custom Live Stage.
10. Do NOT push config/settings_data.json unless you intend to overwrite live Theme Editor state.
11. Push to a duplicate/unpublished theme first. Example:
     shopify theme push --unpublished
   Then preview it before publishing.

IMPORTANT
Do not edit Brave DevTools CSS as the source of truth. Use DevTools only for diagnosis. Permanent changes belong in Liquid/CSS/JSON files.
