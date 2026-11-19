# Brango Connect Website

Brango Connect is a business-opportunity site for people who already sell background checks, and for B2B entrepreneurs who want to own a background check company.

## Core positioning
- You own the company and the client relationships.
- Brango runs the back office: calls and emails, the full background check, and one software portal.
- Partnership terms are not published. The site says those details are discussed on a call.
- Do not publish fees, prices, per-search charges, revenue share, percentages, or earnings figures.
- Confirmed facts used on the site: 25+ years in background screening, 95% partner retention, 50 affiliates, the back-office scope above, and info@brangoconnect.com.
- The one money fact allowed: Brango partner businesses have sold for 4–6X their yearly profit (EBITDA). It always carries the fine print: "Based on past sales of Brango partner businesses. Past results. Not a guarantee of future value." Never 3–5X. Never lead with it.
- Brango is selective: "We don't license to everyone."
- Say "license". Never describe the model as a franchise. "Brango" is the company. "Brango Connect" is the site and software name.
- Booking link everywhere: https://calendar.app.google/HRjFjbsaZtN8QM1H8 (Google Calendar). Calendly is retired.
- Footer contact on every page: 866-773-5486 and the Prosper TX mailing address.
- Go Independent page: campaign page for people who already sell background checks. Focused menu. Recruit the person, never an employer's accounts.
- Brokers page: campaign page for business brokers with buyers who haven't found the right business. Referral terms are not published; they are discussed on a call.
- About page: those same facts, with no biographies.
- Technology page: white-label portal, ATS/HRIS integrations, API workflows, webhooks and browser candidate capture.

## Lead path
- The goal of the homepage, Go Independent and Brokers is one action: **Book a call** (Google Calendar). Those three pages have no forms.
- "Prefer email?" links to info@brangoconnect.com.
- The Formspree application form still lives on `about.html` and `whats-included.html`. Submitting redirects to `thank-you.html`.
- Older pages still link to `/#apply` and `/#contact`. Those anchors now sit on the homepage's closing "Book a call" section. Keep the ids `who`, `how`, `faq`, `clients`, `launch`, `apply`, `contact` on the homepage.
- Guide: `guide.html` — "How to go independent in background screening." Printable, public URL.

## Files
- `index.html` — homepage, in the campaign look (`campaign.css`). Ten screens, one idea each: hero with the "pieces" animation, proof, The Binder video, two paths, who it's for, industries, launch timeline, the 4–6X fact, five FAQs, closing call.
- `go-independent.html` — campaign page for background-check salespeople
- `brokers.html` — campaign page for business brokers
- `campaign.css` — the new campaign-page design (one idea per screen, one button: Book a call). Used by `index.html`, `go-independent.html` and `brokers.html`. The inner pages (About, What's Included, Technology, Guide, Blog) still use the older stylesheets. The hero's "pieces" animation is inline SVG driven by this file.
- `assets/video/` — self-hosted videos (720p), posters and captions. Fast Cut on Go Independent. The Binder on the homepage and Brokers.
- `about.html` — facts only
- `guide.html` — 1-page guide
- `thank-you.html` — post-submit expectations (`noindex`)
- `technology.html` — technology and integration capabilities
- `privacy.html` — privacy policy
- `styles.css`, `brand-overrides.css`, `lead.css`, `launch-curtain.css`
- `script.js` — menu, reveals, dashboard animation, form redirect, sticky bar. It does not rewrite marketing copy.
- `sitemap.xml`, `robots.txt`
- `assets/og-image.png` — link-preview image

## Still needs a person
1. Enable Vercel Web Analytics on the project, or the `/_vercel/insights/script.js` request 404s.
2. In Formspree, allow the redirect to `https://brangoconnect.com/thank-you.html` if the project requires an allow-list. With JavaScript on, the site redirects itself after a successful POST.
3. Earnings figures stay off the site. The 4–6X sale multiple above is the only verified money fact.
