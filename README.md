## Development setup

### using docker
 1. create a new `.env` file and copy the contents of `.env.example` into it
 2. run `docker compose up` command to start the related dependencies
 3. run `npm run dev` to start the development server
 4. Setup the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` using following steps
     1. Go to `google cloud > google console > API and Services > Credentials`.
     2. Select `OAuth client ID`
     3. add `http//:localhost:3000` to authorized javascript origins
     4. add `http://localhost:3000/api/auth/callback/google`to 'Authorized Redirect URLs'
     5. click 'Create' to create the credentials and get `Client Id` and `Client Secret`
  5. Initalize other environment variables
