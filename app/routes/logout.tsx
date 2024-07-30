import { redirect } from "@remix-run/react";

export function clientLoader() {
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("jwt");
  return redirect("/");
}
