import * as React from "react";
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

export interface RouteConfig {
  path: string;
  element: React.ComponentType<any>;
  protected?: boolean;
  props?: (params: any, searchParams: URLSearchParams, navigate: any, extra: any) => any;
}

export const routesConfig: RouteConfig[] = [
  {
    path: "/login",
    element: Login,
    props: (_, __, navigate, { setUser }) => ({
      onLogin: (userData: any) => {
        setUser(userData);
        navigate("/");
      },
    }),
  },
  {
    path: "/",
    protected: true,
    element: Home,
    props: (_, __, navigate, { setSelectedServiceId, handleNavigation }) => ({
      onSelectService: (serviceId: string) => {
        setSelectedServiceId(serviceId);
        navigate(`/service/${serviceId}`);
      },
      onOpenBooking: (selectedServiceId: string) => {
        navigate(`/booking/${selectedServiceId}?tier=standard`);
      },
      onNavigate: handleNavigation,
    }),
  },
  {
    path: "/services",
    protected: true,
    element: Services,
    props: (_, searchParams, navigate, { setSelectedServiceId, handleNavigation }) => ({
      initialCategory: searchParams.get("category") || undefined,
      onSelectService: (serviceId: string) => {
        setSelectedServiceId(serviceId);
        navigate(`/service/${serviceId}`);
      },
      onNavigate: handleNavigation,
    }),
  },
  {
    path: "/service/:serviceId",
    protected: true,
    element: ServiceDetail,
    props: (params, _, navigate) => ({
      serviceId: params.serviceId!,
      onBack: () => navigate("/services"),
      onContinue: (tierId: string) => {
        navigate(`/booking/${params.serviceId}?tier=${tierId}`);
      },
    }),
  },
  {
    path: "/booking/:serviceId",
    protected: true,
    element: Booking,
    props: (params, searchParams, navigate) => ({
      serviceId: params.serviceId!,
      tierId: searchParams.get("tier") || "standard",
      onBack: () => navigate(`/service/${params.serviceId}`),
      onConfirm: () => navigate(`/checkout/${params.serviceId}?tier=${searchParams.get("tier") || "standard"}`),
    }),
  },
  {
    path: "/checkout/:serviceId",
    protected: true,
    element: CheckoutTracking,
    props: (params, searchParams, navigate) => ({
      serviceId: params.serviceId!,
      tierId: searchParams.get("tier") || "standard",
      onBack: () => navigate(`/booking/${params.serviceId}?tier=${searchParams.get("tier") || "standard"}`),
      onConfirm: () => {
        navigate(`/payment-success/${params.serviceId}?tier=${searchParams.get("tier") || "standard"}`);
      },
    }),
  },
  {
    path: "/payment-success/:serviceId",
    protected: true,
    element: PaymentSuccess,
    props: (params, searchParams, navigate, { handleNavigation }) => ({
      serviceId: params.serviceId!,
      onTrack: () => {
        navigate(`/track/${params.serviceId}?tier=${searchParams.get("tier") || "standard"}`);
      },
      onNavigate: handleNavigation,
    }),
  },
  {
    path: "/track/:serviceId",
    protected: true,
    element: Track,
    props: (params, _, navigate, { handleNavigation }) => ({
      serviceId: params.serviceId!,
      onNavigate: handleNavigation,
      onHome: () => navigate("/"),
    }),
  },
  {
    path: "/bookings",
    protected: true,
    element: Bookings,
    props: (_, __, navigate, { setSelectedServiceId, handleNavigation }) => ({
      onNavigate: handleNavigation,
      onTrackService: (serviceId: string) => {
        setSelectedServiceId(serviceId);
        navigate(`/track/${serviceId}?tier=standard`);
      },
      onViewDetail: (bookingId: string) => {
        navigate(`/booking-detail/${bookingId}`);
      },
    }),
  },
  {
    path: "/booking-detail/:bookingId",
    protected: true,
    element: BookingDetail,
    props: (params, _, navigate, { setSelectedServiceId }) => ({
      bookingId: params.bookingId!,
      onBack: () => navigate("/bookings"),
      onTrack: (serviceId: string) => {
        setSelectedServiceId(serviceId);
        navigate(`/track/${serviceId}?tier=standard`);
      },
    }),
  },
  {
    path: "/account",
    protected: true,
    element: Account,
    props: (_, __, navigate, { user, setUser, handleNavigation }) => ({
      onNavigate: handleNavigation,
      user: user,
      onEditProfile: () => navigate("/edit-profile"),
      onLogout: () => {
        setUser(null);
        navigate("/login");
      },
    }),
  },
  {
    path: "/edit-profile",
    protected: true,
    element: EditProfile,
    props: (_, __, navigate, { user, setUser }) => ({
      user: user,
      onBack: () => navigate("/account"),
      onSave: (updatedUser: any) => {
        setUser({
          ...user!,
          name: updatedUser.name,
          email: updatedUser.email,
        });
        navigate("/account");
      },
    }),
  },
];
