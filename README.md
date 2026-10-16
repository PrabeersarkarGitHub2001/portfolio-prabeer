# Prabeer Sarkar — Portfolio

Personal portfolio for Prabeer Sarkar, a full-stack developer in Hyderabad. The site is a frontend-only React application: one scrolling page, a downloadable resume, and a contact form powered by [EmailJS](https://www.emailjs.com/).

Email delivery is **not confirmed** until you add your EmailJS service ID, template ID, and public key, then send a real message and see it arrive. The form is implemented and fails safely when those values are missing. It does not pretend a message was sent.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Framer Motion
- `@emailjs/browser`
- ESLint

There is no Node server, database, or authentication. Do not add an EmailJS private key to this project.

## Folder structure

```text
public/
  favicon.svg
  resume.pdf                 ← you add this file; it is not generated
src/
  components/
    Background.tsx
    BackToTop.tsx
    ContactForm.tsx
    ExperienceTimeline.tsx
    Footer.tsx
    HeroVisual.tsx
    Links.tsx
    Navbar.tsx
    ProjectCard.tsx
    Reveal.tsx
    Section.tsx
    SectionHeading.tsx
    SkillGroup.tsx
  data/
    portfolio.ts             ← profile, skills, experience, projects, GitHub URL
  hooks/
    useActiveSection.ts
  lib/
    cn.ts
    emailjs.ts
    url.ts
    validation.ts
  sections/
    About.tsx
    Contact.tsx
    Experience.tsx
    Hero.tsx
    Projects.tsx
    Skills.tsx
  types/
    contact.ts
    portfolio.ts
  App.tsx
  index.css
  main.tsx
  vite-env.d.ts
.env.example
.gitignore
eslint.config.js
index.html
package.json
tsconfig.json
vite.config.ts
```

## Install and run

Requires Node.js 20 or newer.

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

macOS and Linux:

```bash
npm install
cp .env.example .env
npm run dev
```

The dev server prints a local URL, usually `http://localhost:5173`.

Restart `npm run dev` after you change `.env`. Vite reads environment variables when the process starts.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local site |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run build` | Typecheck and write the production site to `dist` |
| `npm run preview` | Serve the `dist` folder locally |

## Resume

Copy your real PDF to:

```text
public/resume.pdf
```

The navbar and hero buttons use `/resume.pdf` and suggest the download name `Prabeer-Sarkar-Resume.pdf`. This repository does not include a generated resume. Until the file is there, the link is correct and the file itself is missing.

## GitHub link

Open `src/data/portfolio.ts` and set `configuredGithubUrl` to your real profile, for example `https://github.com/your-username`.

While that string is empty, the site shows **GitHub · URL pending** and does not link anywhere. Do not put a placeholder URL such as `https://github.com/username`.

## Content

Public copy, skills, roles, and projects live in `src/data/portfolio.ts`. Change them there instead of editing each section.

Illustrations on the project cards are abstract SVG drawings, not product screenshots. The projects are professional case studies and do not have public demo or repository links.

## EmailJS

The form posts with `emailjs.sendForm()` and a React ref. Field `name` attributes match the template variables below. The visitor’s email is copied into a hidden `reply_to` field so you can reply from your inbox.

### Template variables

| Template variable | Form control | Value |
| --- | --- | --- |
| `from_name` | Full name | Visitor’s name |
| `from_email` | Email address | Visitor’s email |
| `subject` | Subject | Visitor’s subject |
| `message` | Message | Visitor’s message |
| `reply_to` | Hidden input | Same address as `from_email` |

Do not add `company_website` to the template. That field is a honeypot. When it is filled, the browser does not call EmailJS.

### Dashboard setup

The site cannot choose your inbox. Set the destination in EmailJS, or anyone with the public key could try to redirect mail.

1. Create an account at [https://www.emailjs.com/](https://www.emailjs.com/).
2. Add an email service and connect it to `prabeersarkar098@gmail.com`. Complete whatever verification EmailJS and Gmail ask for.
3. Create a template on that service.
4. Set **To Email** to `prabeersarkar098@gmail.com`. Type the address in the template. Do not read the recipient from the form.
5. Leave **From Email** as the address tied to the connected EmailJS service. Gmail-based services usually reject a From address that is not that account. The visitor’s address belongs in **Reply To**, not From.
6. Set **Reply To** to `{{reply_to}}`.
7. Set the template subject to something like `Portfolio enquiry: {{subject}}`.
8. Put these variables in the template body:

```text
Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

{{message}}
```

9. Save the template.
10. Copy the **Service ID**, **Template ID**, and **Public Key**.
11. Paste them into `.env`:

```text
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

12. Restart the dev server and send yourself a message.
13. Confirm the message arrives, including the spam folder, and that **Reply** addresses the visitor.

`.env.example` lists the same names with empty values. `.env` is gitignored. Never commit real keys, and never put the EmailJS **private** key in any `VITE_` variable. Vite inlines `VITE_` values into the public JavaScript bundle.

### If the public site should receive mail

Add the same three variables in your host’s environment, for Production and Preview if you use preview deployments. Vite bakes them in at **build** time. Changing them later does nothing until you deploy again.

### Rate limits, domains, and bots

- While a request is in flight, the submit button is disabled and a ref ignores a second submit.
- After EmailJS accepts a message, the form waits 30 seconds before another send in that browser tab. Refreshing the page clears this timer.
- `emailjs.sendForm()` is also called with the SDK `limitRate` option (`throttle: 30000`, stored in `localStorage`). That timer survives a refresh. The SDK starts it when a send is attempted, including a failed attempt. `blockHeadless: true` rejects browsers that expose `navigator.webdriver`.
- Both checks run in the visitor’s browser. Someone can bypass them and call the EmailJS API with the public key. They do not replace the account quota.
- EmailJS enforces its own account quota. A `429` response is shown as a wait message.
- In the EmailJS dashboard, turn on allowed origins / domain restrictions if your account offers them. Include `http://localhost:5173` while developing and your real production origin, such as `https://your-project.vercel.app`.
- Turn on reCAPTCHA or other bot protection there if your plan includes it. This frontend does not ship a captcha key.
- The honeypot stops only very simple bots. It is hidden from keyboard and screen-reader users. A filled honeypot shows the success state and does not call EmailJS.

### Troubleshooting

| What you see | What to check |
| --- | --- |
| Development notice about missing variables | `.env` is missing a value, or the dev server was not restarted |
| Success in the UI, nothing in Gmail | EmailJS logs, spam, unverified service, or the template **To Email** |
| 400 from EmailJS | Template variables must be exactly `from_name`, `from_email`, `subject`, `message`, and `reply_to` |
| 401 or 403 | Public key, or the current origin is not allowed |
| 404 | Service ID or template ID |
| Works locally, fails on Vercel | Production environment variables were missing at build time. Add them and redeploy |
| Resume downloads a missing file | `public/resume.pdf` is not in the project |

## Deploy on Vercel

This project has not been deployed from this workspace. Do these steps with your own GitHub and Vercel accounts.

### GitHub

From the project folder, after `npm install`:

```powershell
git init
git add .
git status
git commit -m "Add personal portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Before the first commit, confirm `git status` does **not** list `.env`. It should list `.env.example`. `node_modules` and `dist` are ignored. Commit `package-lock.json`.

Use a personal repository. Do not force-push.

### Vercel

1. Sign in at [https://vercel.com](https://vercel.com) and choose **Add New Project**.
2. Import the GitHub repository.
3. Framework preset: **Vite**.
4. Install command: `npm install`.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Add environment variables for **Production** (and **Preview** if you want the form on preview URLs):
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
8. Deploy.
9. Open the Vercel URL, submit the contact form with a real address you can check, and confirm the message arrives with a working reply-to.
10. Add that production origin to the EmailJS allowed-origins list.
11. If you change any environment variable, redeploy. The previous build keeps the old values.

A direct visit to `/resume.pdf` works after you add the file and redeploy, because Vite copies `public/` into `dist/`. No SPA rewrite is required; the site does not use a client-side router.

After the site has a public URL, you can add `og:url` in `index.html`. It is omitted here so the tags do not point at a domain you do not have yet.

## Manual test checklist

- [ ] Empty submit shows required-field messages and moves focus to the first invalid field.
- [ ] `not-an-email` shows the email format message.
- [ ] A valid form with empty EmailJS variables shows the configuration message and does **not** show success.
- [ ] With real keys, one message arrives at `prabeersarkar098@gmail.com` and Reply uses the visitor’s address.
- [ ] Double-clicking Send does not create two requests.
- [ ] A second message inside 30 seconds shows the wait message.
- [ ] Navbar links scroll to the right sections and the current section is indicated.
- [ ] Mobile menu opens, closes, traps Tab, and closes with Escape.
- [ ] Resume points at `/resume.pdf` on desktop and mobile. After you add the PDF, the file opens or downloads.
- [ ] GitHub shows “URL pending” until you set a real URL. LinkedIn opens your profile.
- [ ] Layouts at about 375px, 768px, and 1280px do not overflow sideways.
- [ ] Keyboard focus is visible. With reduced motion enabled, scroll and entrance animation stay still.
- [ ] `npm run lint`, `npm run typecheck`, and `npm run build` succeed.
- [ ] The deployed form is tested on the Vercel URL, not only on localhost.

## Still needed from you

- Your GitHub profile URL, in `src/data/portfolio.ts`
- Your resume PDF, copied to `public/resume.pdf`
- EmailJS service ID, template ID, and public key
- A verified EmailJS service and template whose **To Email** is `prabeersarkar098@gmail.com` and whose **Reply To** is `{{reply_to}}`
- The production domain, so you can allow it in EmailJS and optionally set `og:url`
- Optional reCAPTCHA keys if you enable that feature in EmailJS
