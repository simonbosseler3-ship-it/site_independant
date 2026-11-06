-- 2/2 — Case « Je suis indépendant depuis moins de 2 ans » du formulaire de devis
alter table devis_requests
  add column if not exists is_new_independent boolean not null default false;
