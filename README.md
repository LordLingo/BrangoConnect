# Brango Connect Website

Brango Connect is a business-opportunity site for people who already sell background checks, and for B2B entrepreneurs who want to own a background check company.

## Core positioning
- You own the company and the client relationships.
- Brango runs the back office: calls and emails, the full background check, and one software portal.
- Partnership terms are not published. The site says those details are discussed on a call.
- Do not publish fees, prices, per-search charges, revenue share, percentages, or earnings figures.
- Confirmed facts used on the site: 25+ years of experience, 50 affiliates, the back-office scope above, and info@brangoconnect.com.
- Go Independent page: for people who already sell background checks.
- About page: those same facts, with no biographies.
- Technology page: white-label portal, ATS/HRIS integrations, API workflows, webhooks and browser candidate capture.

## Lead path
- Short Formspree form (name, email, optional phone, optional message) in the hero and again lower on the page.
- Submitting redirects to `thank-you.html`, which explains the email reply and links to the guide.
- Guide: `guide.html` — “How to go independent in background screening.” Printable. Public URL; the form is the intended delivery, not a login gate.
- Sticky apply bar after the hero form leaves the screen.

## Files
- `index.html` — homepage
- `go-independent.html` — page for background-check salespeople
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
3. Earnings figures stay off the site until Mark verifies any number he wants published.
