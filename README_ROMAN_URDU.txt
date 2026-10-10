MS STUDIO - CINEMATIC WELCOME PATCH

Files:
- src/layouts/Base.astro (existing navbar/logo/fonts preserved, welcomes component added)
- src/components/WelcomeExperience.astro (new overlay)

Instructions:
1. ZIP extract karein.
2. GitHub repo /umairkhanofficial28-projects/ms-studio-weddings/upload/main open karein.
3. src folder ke ANDAR ki files/folders GitHub root mein drag/drop karein.
4. Ensure exact paths src/layouts/Base.astro and src/components/WelcomeExperience.astro.
5. Commit message: Add cinematic intro and optional Web3Forms welcome enquiry
6. Cloudflare Pages ka naya deployment check karein.
7. Browser ke new tab mein homepage open karein: intro ~1.8 sec, then enquiry panel.
8. Skip website without sending, or submit test then inbox check.
9. Refresh (same tab) repeat nahi hoga; naya tab alag browser session maana jayega.

Important:
- Existing Cloudflare PRODUCTION environment variable PUBLIC_WEB3FORMS_KEY required. No key inside ZIP.
- Public form key client bundle ka part hoti hai. Web3Forms dashboard par authorized domain set karna recommended hai.
- Agar Cloudflare build fail ho, latest deployment logs share karein.
- Emailed enquiry is NOT a confirmed booking.
- Existing booking forms, packages and images untouched.
