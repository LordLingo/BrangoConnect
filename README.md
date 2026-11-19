# Brango Connect Website

Brango Connect is a business-opportunity site for people who already sell background checks, and for B2B entrepreneurs who want to own a background check company.

## Core positioning
- You own the company and the client relationships.
- Brango runs the back office: calls and emails, the full background check, and one software portal.
- Partnership terms are not published. The site says those details are discussed on a call.
- Do not publish fees, prices, per-search charges, revenue share, percentages, or earnings figures.
- Confirmed facts used on the site: 25+ years in background screening, 50 affiliates, no affiliate has ever left, the back-office scope above, and info@brangoconnect.com.
- The number 50 is always framed as buying power ("50 companies buying as one", "the vendor pricing and turnaround of fifty companies"). Never "50 affiliates on the platform": it makes visitors ask how they would compete with the other affiliates. The FAQ answers that question directly.
- Do not claim the lowest pricing or the fastest turnaround "in the industry" without a number Mark has supplied.
- Turnaround: the average on a full report is under 8 hours on a business day. Say exactly that. No "fastest".
- Experience: all but one affiliate started with no background check experience. Use it on the homepage and Brokers. Do not use it on Go Independent.
- Demos: Brango's top salesperson (7+ years with Brango) joins an affiliate's first 10 demos at no charge. More are available after that.
- Support is U.S.-based. Say that. Never say a competitor's support is offshore, and never name a competitor.
- Fit: this takes 20 to 30 hours a week. Brango turns down people who want one more thing to own on the side.
- First clients: nearly every affiliate's first client came from their own network. Use on the homepage only. Not on Go Independent, where a rep's network is their employer's client list.
- Never on the site: license prices, owner financing, time-to-first-client, platform or affiliate revenue, any affiliate's name.
- Buttons: "See the portal live" on the homepage and Go Independent ("See it live" in the phone header). "Book a call" on Brokers. All go to the same Google Calendar link.
- Retention is written in words ("0 affiliates have ever left"), never as a percentage. Do not use "95%" or "100%". The videos still say 95% until they are re-recorded.
- The one money fact allowed: Brango affiliates have sold books of business for 4–6X their yearly profit (EBITDA), and kept their companies. These were sales of client books, not of whole companies, so never write "partner businesses have sold". It always carries the fine print: "Based on past sales of books of business by Brango affiliates. Past results. Not a guarantee of future value." Never 3–5X. Never lead with it. No dollar amounts.
- Brango is selective: "We don't license to everyone."
- Say "license". Never describe the model as a franchise. "Brango" is the company. "Brango Connect" is the site and software name.
- Booking link everywhere: https://calendar.app.google/HRjFjbsaZtN8QM1H8 (Google Calendar). Calendly is retired.
- Footer contact on every page: 866-773-5486 and the Prosper TX mailing address.
- Go Independent page: campaign page for people who already sell background checks. Focused menu. Recruit the person, never an employer's accounts.
- Brokers page: campaign page for business brokers with buyers who haven't found the right business. Referral terms are not published; they are discussed on a call.
- About page: those same facts, with no biographies.
- Technology page: white-label portal, ATS/HRIS integrations, API workflows, webhooks and browser candidate capture.

## Lead path
- The goal of the homepage, Go Independent and Brokers is one action: **Book a call** (Google Calendar). Those pages have no forms.
- "Prefer email?" links to info@brangoconnect.com.
- One short form remains, on `about.html` ("Not ready for a call? Ask a question."). `campaign.js` posts it to Formspree and then goes to `thank-you.html`.
- Older pages still link to `/#apply` and `/#contact`. Those anchors now sit on the homepage's closing "Book a call" section. Keep the ids `who`, `how`, `faq`, `clients`, `launch`, `apply`, `contact` on the homepage.
- Guide: `guide.html` — "How to go independent in background screening." Printable, public URL.

## Files
- `index.html` — homepage, in the campaign look (`campaign.css`). Ten screens, one idea each: hero with the "pieces" animation, proof, The Binder video, two paths, who it's for, industries, launch timeline, the 4–6X fact, five FAQs, closing call.
- `go-independent.html` — campaign page for background-check salespeople
- `brokers.html` — campaign page for business brokers
- `campaign.js` — reports booking clicks and video plays (`data-analytics`) to Vercel Web Analytics on the three campaign-look pages.
- `campaign.css` — the new campaign-page design (one idea per screen, one button: Book a call). Used by every page on the site. `privacy.html` also loads `privacy-policy.css` for its table and section spacing. The hero's "pieces" animation is inline SVG driven by this file.
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

## Webinar
- `webinar.html` — registration for the live webinar, every other Monday at 1:00 PM Central. `webinar-thanks.html` is the confirmation (`noindex`).
- The form posts to the shared Formspree endpoint with the subject "New Brango webinar registration" until Mark supplies a dedicated form code. Swap the `action` in `webinar.html` then.
- The page does not show a specific date. Add one only when Mark confirms the first Monday.
- Someone has to email registrants the date and join link. That is a manual step today.

## Legacy files
`styles.css`, `brand-overrides.css`, `lead.css`, `launch-curtain.css`, `blog/blog.css`, `script.js` and `assets/launch-step-*.svg` are no longer loaded by any page. They are kept only in case something outside this repo still points at them. New work goes in `campaign.css` and `campaign.js`.

## Stories on the site
- Founder quote (Go Independent, About) and the first-affiliate quote (homepage, About) are Mark Lingo's own words, approved by him on Nov 19 2026. Do not edit the wording without him.
- The first affiliate is Mark's business partner. The quote says so. Never add his company name or any revenue figure.

## Blog
- New post: copy `blog/_post-template.html`, then add a card to `blog/index.html`. Both already use the campaign look. Keep the class names (`blog-post`, `blog-body`, `blog-cta`, `blog-card`).
