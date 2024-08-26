# Chorus Interview

## Quick Description

### Backend
 - Two entities were created: `Profile` and `Pokemon` under the `database` module.
 - Two new modules were created under to the `App` Module: 

#### pokemon module
 - Initialize the pokemon data by fetching it from the Pokemon API at launch time using lifecycle event.
 - `[GET] /api/pokemon`: retrieve all 150 pokemons on the DB (no pagination added at this point)

#### profile module
 - `[POST] /api/profile`: create a new Profile.
 - `[GET] /api/profile`: retrieve all profiles (no pagination added at this point).
 - `[GET] /api/profile/:profileId`: retrieve a single profile.
 - `[PUT | DELETE] /api/profile/:profileId/pokemon/:pokemonId`: adds/removes a pokemon to a profile's team.


### Frontend
 - `/` will either list the existing profiles or redirect to `/create-profile/`.
 - `/create-profile/` shows a simple form to create a new profile. Redirects you to `/team-editor/:profileId` on success.
 - `/team-editor/:profileId` 
    - Have a basic profile switcher on the top of the page, with a link to create a new profile
    - Shows the pokemon on the team, clicking on the each selected pokemon removes them from the team.
    - Until the team is full (6 members), the bottom of the page shows a filterable list of all available pokemons. Clicking on each one adds them to the team.

## What is missing
> I run out of time and wanted to focus on delivering a all requested features.

 - Tests.
 - Accessibility.
 - Pokemons order of insertion: on the edit team page, pokemons will be ordered by id and not by addition time. This is because the data is not recorded at the time.
 - The UX is extremely basic and not very friendly.
 - Terrible error messages, no 404...

## A little remark
 This project took me a lot more than a few hours (about 10 total over the weekend). Most of my time was spend figuring out the tools I had low knowledge of (such as pnpm, nx, vite, emotion, nest...)
 A lot of time I unfortunately could spend on what listed in the missing section above.

 I'd be happy to share more feedbacks on the format of this test if we you decide to follow up :) 
 That said, I really did enjoy all the learning I did the last 2 days!