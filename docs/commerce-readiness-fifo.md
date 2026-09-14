# Relic Castle Cards — commerce readiness FIFO

Last audited: 2026-09-14

This queue controls commerce work after the storefront visual system entered maintenance mode. Exactly one item may be ACTIVE. A DONE item is locked unless a verified regression or owner-approved change requires it.

## Current Admin evidence

| Area | Current state | Classification | Required action | Owner approval required? | Validation gate |
| --- | --- | --- | --- | --- | --- |
| Payments | Test payment gateway is available; no live provider is active. PayPal is offered for activation. | OWNER DECISION | Choose and activate a provider only after business/KYC readiness; use its official sandbox where available. | Yes | Successful approved test transaction without a real charge. |
| Taxes | India is collecting via Manual Tax. Tax-inclusive pricing, shipping tax, origin, and HS data are not confirmed. | COMPLIANCE / ACCOUNTANT REVIEW | Confirm GST registration, taxable treatment, inclusivity, and product customs data with an accountant. | Yes | Accountant-approved settings and an approved checkout test. |
| Shipping | One general profile with domestic and international zones is configured; package data exists, carrier accounts are not connected. | OWNER DECISION | Confirm final rates, service levels, territories, insurance, and product weights. | Yes | Rate appears correctly for a real in-stock test product at checkout. |
| Hold in Relic Vault | No proven current implementation. | APP / TECHNICAL FEASIBILITY | Define reservation, storage, consolidation, insurance, cancellation, and fulfillment rules before designing an implementation. | Yes | Written operating model and a tested order lifecycle. |
| Product metafields | `custom.raw_condition`, `custom.seal_condition`, `custom.condition_notes`, and `custom.authenticity_notes` exist and are rendered conditionally. | DONE | Keep values source-backed; do not create duplicates. | No | Product page renders only stored values. |
| Launch product records | Mega Brave and Abyss Eye are ACTIVE but have zero inventory and no SKU. Two placeholder products remain DRAFT. | ACTIVE | Complete source record, SKU, received quantity, weight, condition, and approved media for each live product. | Data supplied by owner | Add-to-cart and shipping-rate test. |
| Policies | Privacy policy is automated. Return/refund, terms, shipping policy, legal notice, and return rules are unset. | OWNER DECISION | Prepare drafts for review; publish only approved legal/commercial wording. | Yes | Owner-approved published policies. |
| Search & Discovery | Installation and current filter configuration are not yet evidenced. | VERIFY FIRST | Inspect official app status; install/configure only when real catalog breadth supports useful filters. | Installation requires action-time confirmation | Filters return meaningful products, not empty options. |
| Collections and navigation | Shop and Live Breaks expose only intentional products; no justified deep taxonomy exists yet. | DONE / DEFERRED | Maintain current simple navigation; add set/type destinations only with sufficient inventory. | No | Every exposed destination contains intended products. |
| Customer purchase flow | Product, empty-cart, search, and account handoff work on desktop/mobile. Checkout and fulfillment cannot be truthfully tested while products are sold out and no provider is live. | BLOCKED | Use an owner-approved in-stock test item and official test payment path after prerequisites are complete. | Yes | Test order reaches a valid fulfillment-ready state. |
| Visual storefront | Homepage narrative, mobile overflow repair, Chase architecture, product trust rendering, and route checks are completed. | DONE | Maintenance only; reopen solely for a verified commerce, accessibility, or responsive defect. | No | Regression test at the affected viewport/route. |

## FIFO execution order

### ACTIVE — 01. Product master-data completion

Collect and enter, per sellable product:

1. Supplier/source record and approved product media.
2. SKU, received quantity, inventory location, and inventory policy.
3. Shipping weight, dimensions/package selection, language, exact set, and condition notes.
4. Merchant-confirmed selling price and collection assignment.

Stop condition: both current products have verified data, but do not activate inventory until physically received and counted.

### NEXT — 02. Policy drafts and owner approval

Prepare review-only drafts for return/refund, shipping, terms, authenticity/condition, FAQ, and Live Break rules. Do not publish restrictions, video-evidence requirements, cancellation rules, or liability language without owner approval.

### NEXT — 03. Payments, tax, and shipping decision packet

Produce one owner-facing packet covering provider choice, KYC owner, test/sandbox route, GST/accountant questions, pricing inclusivity, domestic/international rates, service levels, and insurance. These settings are consequential and remain unmodified.

### NEXT — 04. Search & Discovery and purchase-flow validation

Verify the official app and install/configure only justified filters. Then run an approved, non-live payment test against a real in-stock test product, checking cart, rate selection, order creation, and fulfillment handoff.

## Explicit non-goals until their gate opens

- No live payment activation, KYC submission, bank details, GSTIN entry, or final tax-rate selection.
- No final shipping-price or free-shipping-threshold changes.
- No bank-transfer method or high-value threshold.
- No fake Hold in Relic Vault rate or partial implementation.
- No test-product deletion or expansion beyond the two existing Draft placeholders.
- No visual redesign or live theme deployment.

## Evidence protocol

For every queue item, record: current state, source of truth, decision owner, validation result, date, and resulting commit/configuration reference. Sidekick and Gemini may be advisory only; their messages require action-time confirmation before sending material to them.
