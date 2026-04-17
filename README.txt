An AI-powered game recommendation system using the Steam API and LLM-based agents. Features personality-driven outputs and user preference modeling based on gameplay behavior found in Steam.

To start local server:
1) navigate to the backend directory
   -> cd backend

2) run "npm install" in the terminal to install necessary dependencies
    -> npm install

3) run "npm audit fix" if the npm install returns back that there is a vulnerability to patch
    -> npm aufit fix

4) run the server
    -> npm run dev

currently three routes to use:
    1) /api/steam/owned/{id} -> gets all of the user's owned games
    2) /api/steam/recently/{id} -> gets all of the user's recently played games
    3) /api/user/{id} -> gets the users steam id through their vanity url