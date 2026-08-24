export default function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* Dégradé diagonal de fond, dans l'esprit du logo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #ede9fe 0%, #f5f3ff 22%, #eef2ff 45%, #faf5ff 68%, #f8fafc 100%)",
        }}
      />

      {/* Texture de points, façon grille de développeur */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(76,70,224,0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Halos de couleur, bien plus présents */}
      <div className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-violet-400/50 via-purple-300/30 to-transparent blur-[100px]" />
      <div className="absolute top-10 right-[-200px] w-[750px] h-[750px] rounded-full bg-gradient-to-bl from-indigo-400/45 via-blue-300/25 to-transparent blur-[100px]" />
      <div className="absolute bottom-[-250px] left-1/3 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-fuchsia-300/40 via-violet-200/25 to-transparent blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-gradient-to-r from-violet-200/30 via-transparent to-indigo-200/30 blur-[120px]" />

      {/* Motif "lignes de vitesse" du logo, grand et net */}
      <svg
        className="absolute -bottom-16 -right-16 w-[560px] h-[560px] text-indigo-900/[0.06]"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M92 8 L30 92 M92 26 L48 92 M92 44 L66 92"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Accent "chevrons de code" */}
      <svg
        className="absolute top-20 -right-6 w-72 h-72 text-indigo-900/[0.05]"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M35 20 L10 50 L35 80" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M65 20 L90 50 L65 80" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Second jeu de chevrons, bas gauche, pour équilibrer la composition */}
      <svg
        className="absolute bottom-24 -left-10 w-56 h-56 text-violet-900/[0.045] rotate-12"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M35 20 L10 50 L35 80" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M65 20 L90 50 L65 80" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}