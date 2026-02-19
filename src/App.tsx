import * as React from "react";
import { AppRoutes } from "./routes/AppRoutes";

export function App() {
  const [user, setUser] = React.useState<{ name: string; profile: string; email: string } | null>(null);

  return (
    <AppRoutes user={user} setUser={setUser} />
  );
}
