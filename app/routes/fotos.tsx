import { Outlet } from "@remix-run/react";
import { Container } from "~/components/container";

export default function Fotos() {
  return (
    <Container title="Fotos">
      <Outlet />
    </Container>
  );
}
