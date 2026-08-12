# NIFTY Behavior Tracker V11 — 1-minute automatic mode

The app automatically captures the previous trading-day close and the first NIFTY 50 1-minute candle (09:15–09:16 IST).

Opening classification:
- Gap Up: gap >= +0.10%
- Gap Down: gap <= -0.10%
- Flat: between -0.10% and +0.10%

Outcome classification from the first 1-minute candle:
- Close > Open = Up
- Close < Open = Down
- Close = Open = Flat

No manual behaviour selection is required.

## Setup

1. Run `schema.sql` in your existing Supabase SQL Editor.
2. Keep your Supabase URL and publishable/anon key in `index.html`.
3. Create a Google Apps Script Web App using `google-apps-script.gs`.
4. Deploy it as Web app, execute as yourself, access: Anyone.
5. Put the Web App URL into `MARKET_CAPTURE_URL` in `index.html`.
6. Upload the updated `index.html` to GitHub Pages.
7. After 09:16 IST, open Daily Capture and press Capture Today's NIFTY.

The Apps Script uses Yahoo Finance's chart endpoint for the 1-minute NIFTY data. It is an unofficial source and can change or fail; verify unusual values against your trading terminal.

The historical records are stored in Supabase PostgreSQL.
