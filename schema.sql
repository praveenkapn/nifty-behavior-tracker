-- NIFTY Behavior Tracker V11
-- Run in Supabase SQL Editor.

alter table public.daily_sessions
  add column if not exists candle_open numeric,
  add column if not exists candle_close numeric,
  add column if not exists candle_change numeric,
  add column if not exists candle_change_percent numeric;

alter table public.daily_sessions drop constraint if exists daily_sessions_result_check;
alter table public.daily_sessions
  add constraint daily_sessions_result_check
  check (result in ('Up','Down','Flat'));

create index if not exists daily_sessions_user_date_idx
on public.daily_sessions(user_id, date desc);

update public.daily_sessions set result='Up' where result='Recovers';
update public.daily_sessions set result='Down' where result='Further Down';
