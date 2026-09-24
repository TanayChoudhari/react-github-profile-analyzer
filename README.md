# react-github-profile-analyzer

## GitHub API rate limits

The app calls GitHub through a Netlify Function so the token is never included in the React bundle.

In Netlify, open **Site configuration > Environment variables** and add:

```text
GITHUB_TOKEN=your_github_token
```

Then trigger a new deployment. Do not use a `VITE_` prefix for this variable, and never commit the token.

For local development, use Netlify Dev so the function is available:

```bash
npx netlify dev
```

If the token from the previous `.env.example` was real, revoke it in GitHub and create a new one.