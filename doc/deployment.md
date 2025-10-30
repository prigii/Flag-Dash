# Deployment Guide

Flag Dash is a purely client-side static application. This makes deployment straightforward and cost-effective. You can host it on any service that supports static file hosting.

## Deployment Steps

The general process involves placing the contents of the project's root directory onto a web server.

1.  **Collect Files:**
    The following files and directories need to be deployed:
    -   `index.html`
    -   `index.tsx`
    -   `App.tsx`
    -   `metadata.json`
    -   `manifest.json`
    -   `sw.js`
    -   `icons/` (and all its contents)

2.  **Choose a Hosting Provider:**
    Here are some popular and easy-to-use options for static site hosting:
    -   Vercel
    -   Netlify
    -   GitHub Pages
    -   Cloudflare Pages
    -   Firebase Hosting

## Example: Deploying with Vercel

Vercel is a great choice for its simplicity and tight integration with Git.

1.  **Push to a Git Repository:**
    Push your project to a GitHub, GitLab, or Bitbucket repository.

2.  **Import Project in Vercel:**
    -   Sign up or log in to your Vercel account.
    -   Click "Add New..." -> "Project".
    -   Import the Git repository you just created.

3.  **Configure Project:**
    -   Vercel will likely auto-detect that it's a static site. No special framework preset or build command is needed.
    -   The **Root Directory** should be the base of your repository.
    -   There is no **Build Command**.
    -   There is no **Output Directory**.

4.  **Deploy:**
    -   Click the "Deploy" button. Vercel will deploy your site and provide you with a URL.

## Example: Deploying with Netlify

Netlify offers a similar drag-and-drop or Git-based workflow.

1.  **Drag and Drop:**
    -   Log in to Netlify.
    -   In your team's "Sites" tab, you can drag the entire project folder into the upload area. Netlify will deploy it instantly.

2.  **Git-Based:**
    -   Click "Add new site" -> "Import an existing project".
    -   Connect to your Git provider and select the repository.
    -   Leave the build settings empty (no build command or publish directory).
    -   Click "Deploy site".

## Important Considerations

-   **HTTPS:** A PWA requires the site to be served over HTTPS for the service worker to register. All the recommended hosting providers above offer free SSL certificates and enable HTTPS by default.
-   **Custom Domain:** You can easily configure a custom domain name through your chosen hosting provider's dashboard.
