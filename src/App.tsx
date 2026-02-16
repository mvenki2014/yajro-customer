import * as React from "react";
import { Route } from "@/types";
import { Home } from "@/screens/Home";
import { Services } from "@/screens/Services";
import { ServiceDetail } from "@/screens/ServiceDetail";
import { Booking } from "@/screens/Booking";
import { CheckoutTracking } from "@/screens/CheckoutTracking";
import { Track } from "@/screens/Track";
import { PaymentSuccess } from "@/screens/PaymentSuccess";
import { Bookings } from "@/screens/Bookings";
import { BookingDetail } from "@/screens/BookingDetail";
import { Account } from "@/screens/Account";
import { EditProfile } from "@/screens/EditProfile";
import { Login } from "@/screens/Login";

export function App() {
  const [user, setUser] = React.useState<{ name: string; profile: string; email: string } | null>(null);
  const [route, setRoute] = React.useState<Route>({ name: "login" });
  const [selectedServiceId, setSelectedServiceId] = React.useState(
    "satyanarayana-vratam"
  );

  const handleNavigation = (page: string, categoryId?: string) => {
    switch (page) {
      case "home":
        setRoute({ name: "home" });
        break;
      case "services":
        setRoute({ name: "services", categoryId });
        break;
      case "bookings":
        setRoute({ name: "bookings" });
        break;
      case "tracking":
        setRoute({ name: "track", serviceId: selectedServiceId, tierId: "standard" });
        break;
      case "account":
        setRoute({ name: "account" });
        break;
      default:
        setRoute({ name: "home" });
    }
  };

  if (route.name === "login") {
    return (
      <Login
        onLogin={(userData) => {
          setUser(userData);
          setRoute({ name: "home" });
        }}
      />
    );
  }

  if (route.name === "home") {
    return (
      <Home
        onSelectService={(serviceId) => {
          setSelectedServiceId(serviceId);
          setRoute({ name: "service", serviceId });
        }}
        onOpenBooking={() => {
          setRoute({ name: "booking", serviceId: selectedServiceId, tierId: "standard" });
        }}
        onNavigate={handleNavigation}
      />
    );
  }

  if (route.name === "services") {
    return (
      <Services
        initialCategory={route.categoryId}
        onSelectService={(serviceId) => {
          setSelectedServiceId(serviceId);
          setRoute({ name: "service", serviceId });
        }}
        onNavigate={handleNavigation}
      />
    );
  }

  if (route.name === "service") {
    return (
      <ServiceDetail
        serviceId={route.serviceId}
        onBack={() => setRoute({ name: "services" })}
        onContinue={(tierId) => {
          setRoute({ name: "booking", serviceId: route.serviceId, tierId });
        }}
      />
    );
  }

  if (route.name === "booking") {
    return (
      <Booking
        serviceId={route.serviceId}
        tierId={route.tierId}
        onBack={() => setRoute({ name: "service", serviceId: route.serviceId })}
        onConfirm={() => setRoute({ name: "checkout", serviceId: route.serviceId, tierId: route.tierId })}
      />
    );
  }

  if (route.name === "checkout") {
    return (
      <CheckoutTracking
        serviceId={route.serviceId}
        tierId={route.tierId}
        onBack={() => setRoute({ name: "booking", serviceId: route.serviceId, tierId: route.tierId })}
        onConfirm={() => {
          setRoute({ name: "payment-success", serviceId: route.serviceId, tierId: route.tierId });
        }}
      />
    );
  }

  if (route.name === "payment-success") {
    return (
      <PaymentSuccess
        serviceId={route.serviceId}
        onTrack={() => {
          setRoute({ name: "track", serviceId: route.serviceId, tierId: route.tierId });
        }}
        onNavigate={handleNavigation}
      />
    );
  }

  if (route.name === "track") {
    return (
      <Track
        serviceId={route.serviceId}
        onNavigate={handleNavigation}
        onHome={() => setRoute({ name: "home" })}
      />
    );
  }

  if (route.name === "bookings") {
    return (
      <Bookings
        onNavigate={handleNavigation}
        onTrackService={(serviceId) => {
          setSelectedServiceId(serviceId);
          setRoute({ name: "track", serviceId, tierId: "standard" });
        }}
        onViewDetail={(bookingId) => {
          setRoute({ name: "booking-detail", bookingId });
        }}
      />
    );
  }

  if (route.name === "booking-detail") {
    return (
      <BookingDetail
        bookingId={route.bookingId}
        onBack={() => setRoute({ name: "bookings" })}
        onTrack={(serviceId) => {
          setSelectedServiceId(serviceId);
          setRoute({ name: "track", serviceId, tierId: "standard" });
        }}
      />
    );
  }

  if (route.name === "account") {
    return (
      <Account
        onNavigate={handleNavigation}
        user={user}
        onEditProfile={() => setRoute({ name: "edit-profile" })}
        onLogout={() => {
          setUser(null);
          setRoute({ name: "login" });
        }}
      />
    );
  }

  if (route.name === "edit-profile") {
    return (
      <EditProfile
        user={user}
        onBack={() => setRoute({ name: "account" })}
        onSave={(updatedUser) => {
          setUser({
            ...user!,
            name: updatedUser.name,
            email: updatedUser.email,
          });
          setRoute({ name: "account" });
        }}
      />
    );
  }

  return (
    <Home
      onSelectService={(serviceId) => {
        setSelectedServiceId(serviceId);
        setRoute({ name: "service", serviceId });
      }}
      onOpenBooking={() => {
        setRoute({ name: "booking", serviceId: selectedServiceId, tierId: "standard" });
      }}
      onNavigate={handleNavigation}
    />
  );
}
