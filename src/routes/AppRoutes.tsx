import * as React from "react";
import { Routes, Route, useNavigate, useParams, useSearchParams, Navigate } from "react-router-dom";
import { ShellProvider } from "@/context/ShellContext";
import { MobileShell } from "@/components/layout/MobileShell";
import { routesConfig } from "./config";

interface AppRoutesProps {
  user: any;
  setUser: (user: any) => void;
}

export function AppRoutes({ user, setUser }: AppRoutesProps) {
  const navigate = useNavigate();
  const [selectedServiceId, setSelectedServiceId] = React.useState(
    "satyanarayana-vratam"
  );

  const handleNavigation = (page: string, categoryId?: string) => {
    switch (page) {
      case "home":
        navigate("/");
        break;
      case "services":
        navigate(categoryId ? `/services?category=${categoryId}` : "/services");
        break;
      case "bookings":
        navigate("/bookings");
        break;
      case "tracking":
        navigate(`/track/${selectedServiceId}?tier=standard`);
        break;
      case "account":
        navigate("/account");
        break;
      default:
        navigate("/");
    }
  };

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <ShellProvider>
      <MobileShell>
        <Routes>
          {routesConfig.map((route) => {
            const RouteElement = (
              <RouteWrapper
                route={route}
                user={user}
                setUser={setUser}
                setSelectedServiceId={setSelectedServiceId}
                handleNavigation={handleNavigation}
              />
            );

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.protected ? (
                    <ProtectedRoute>{RouteElement}</ProtectedRoute>
                  ) : (
                    RouteElement
                  )
                }
              />
            );
          })}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MobileShell>
    </ShellProvider>
  );
}

function RouteWrapper({ route, user, setUser, setSelectedServiceId, handleNavigation }: any) {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const props = route.props
    ? route.props(params, searchParams, navigate, {
        user,
        setUser,
        setSelectedServiceId,
        handleNavigation,
      })
    : {};

  const Element = route.element;
  return <Element {...props} />;
}
