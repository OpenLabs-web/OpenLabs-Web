# Openlabs Web

A lightweight, responsive multi-page website for Openlabs.

## Pages
- `index.html` — home
- `projects.html` — projects
- `studio.html` — experiments and roadmap (standalone page)
- `contact.html` — project links and an email draft form

## Run locally
Open `index.html` in your browser, or use VS Code Live Server.

## GitHub Pages
This is a plain HTML/CSS/JavaScript site and has no build step. In **GitHub repository Settings > Pages**, choose **Deploy from a branch**, branch `main`, folder `/(root)`.

For a project repository, the address usually includes the repository name, such as `https://openlabs-web.github.io/`, depending on your GitHub organization/account setup.

## Important notes
- Website version: `v1.01a`.
- The contact form opens a prefilled email draft; the visitor must send it from their email app. The site does not store messages.
- Sign-in, sign-up and Supabase are not connected yet.
- Never put private API keys or passwords in frontend files.
