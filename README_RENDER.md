Render deployment instructions:

1. Push this repo to GitHub (branch main).
2. Create a new Web Service on Render and connect to this repo or import via render.yaml.
3. Set environment variables: DATABASE_URL, SESSION_SECRET.
4. Render will run `npm run build` and `npm run start`.

Note: Ensure Postgres is provisioned and DATABASE_URL points to it.
