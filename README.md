# NIFTY Behavior Tracker

A mobile-first Next.js foundation for recording NIFTY opening behavior and calculating historical frequencies.

## Current working features
- Daily entry
- Flat / Gap Up / Gap Down
- Recovers / Further Down / Flat
- Automatic gap points and gap %
- 15m / 30m fields
- High / Low / Close
- Expiry, major event, market regime
- All-time, last-20 and last-50 probabilities
- Gap-size analysis
- Sample-size warnings
- History editing/deletion
- Local browser persistence

## Run
npm install
npm run dev

The current UI intentionally stores data locally in the browser so it works immediately without credentials. The included Supabase schema is ready for the production cloud-sync phase.

## Production next step
Connect Supabase authentication and replace the local storage adapter with Supabase CRUD. Then add CSV import/export, full 100-session rolling view, expiry/day-of-week/event conditional analysis, tests, and deployment.
