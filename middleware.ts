import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const isAdminRoute =
    request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin/login";
  const hasSession = request.cookies.getAll().some(({ name }) => name.startsWith("sb-"));

  // Visiteur sans session Supabase : rien à rafraîchir, on évite un appel réseau inutile.
  if (!hasSession) {
    return isAdminRoute ? NextResponse.redirect(new URL("/admin/login", request.url)) : response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Rafraîchit le jeton si besoin ; les nouveaux cookies sont écrits dans `response` via setAll.
  const { data: { user } } = await supabase.auth.getUser();

  if (!user && isAdminRoute) {
    const redirect = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  }

  return response;
}

export const config = {
  // Toutes les pages (la Navbar lit la session partout), sauf fichiers statiques et images.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};