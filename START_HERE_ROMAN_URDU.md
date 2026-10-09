# MS Studio Website — Roman Urdu Quick Start

Ye Claude ke Stage 1 project ka updated Stage 2 source code hai.

## Kya bana hai?

- Naya wedding hero aur sample gallery (aapke PDF ke photos se).
- Essential Love Rs 50,000; Signature Rs 100,000; Royal Rs 185,000.
- PDF wale tamam add-ons aur custom calculator.
- Mehndi, Baraat, Walima, Nikkah waghera ke **multiple events ek quotation mein**.
- WhatsApp enquiry, print quotation, Netlify Forms.
- Founder/team mein apni photos add karne ka setup.
- Aapke tamam supplied social media aur Google Business Profile links.

## GitHub + Netlify par kaise upload karna hai?

1. Ye ZIP **extract** karein.
2. Folder `ms-studio` kholein; `package.json`, `src`, `public`, `netlify.toml` sab isi mein hain.
3. GitHub par **new repository** banayein aur `ms-studio` folder ke **andar wali files** repository ke root mein upload karein. GitHub Desktop use karna zip ki saari folders preserve karne ke liye aksar easy hota hai.
4. Netlify par **Add new project → GitHub repository select** karein.
5. Build command `npm run build`, publish `dist`, Node 22.
6. Netlify par deployment ka result check karein. Agar error aaye, deploy log share kar dein. **Ye offline environment mein poora build test nahi ho saka hai.**
7. Deploy ke baad Forms dashboard mein booking aur quotation form submit kar ke test karein.
8. Jab final URL mil jaye to `astro.config.mjs`, `src/data/site.ts`, `public/robots.txt` mein update karein.

## Live karne se pehle lazmi checks

- Package PDF mein booking 50% likhi hai, aapki newest instruction 100% hai. Code mein 100% draft rakha hai, ab aapko finalize karna hai.
- Source PDF wali wedding photos ke publication rights confirm karne hain.
- Founder aur team ki photos/bio baad mein `src/assets/team/` aur `src/data/` mein add kar sakte hain.
- Original high-quality hero: `src/assets/site/hero.webp` ko replace karein.
- Jab tak approvals pending hain, `site.launchApproved = false` hai. Iska matlab Google par site index nahi honi chahiye. Sab final ho jaye to `true` karein.
- Site ka URL `weddingsbyumair.netlify.app` sirf example hai, availability guarantee nahi.

**Netlify credits:** Code ko GitHub par rakhne se Netlify AI Agent credits nahi lagenge, lekin normal build/hosting credits lag sakte hain. Lajawab aur wedding site same Netlify team par hon to budget share karenge.
