-- 1/2 — Nouveaux tarifs (novembre 2026) — à exécuter dans Supabase > SQL Editor
begin;

update services set starting_price = 900  where slug = 'vitrine';
update services set starting_price = 800  where slug = 'refonte';
update services set starting_price = 25,
  note = replace(note, 'à partir de 30 €/mois', 'à partir de 25 €/mois')
  where slug = 'maintenance';
update services set starting_price = 1200 where slug = 'e_commerce';
update services set starting_price = 300  where slug = 'landing_page';

commit;

select slug, starting_price, price_period from services order by display_order;
