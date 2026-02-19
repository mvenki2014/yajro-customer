import * as React from "react";

interface ShellContextType {
  setTitle: (title: React.ReactNode) => void;
  setFooter: (footer: React.ReactNode) => void;
  setBottomNav: (bottomNav: React.ReactNode) => void;
}

const ShellContext = React.createContext<ShellContextType | undefined>(undefined);

interface ShellValuesType {
  title: React.ReactNode;
  footer: React.ReactNode;
  bottomNav: React.ReactNode;
}

const ShellValuesContext = React.createContext<ShellValuesType>({
  title: null,
  footer: null,
  bottomNav: null,
});

export function ShellProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = React.useState<React.ReactNode>(null);
  const [footer, setFooter] = React.useState<React.ReactNode>(null);
  const [bottomNav, setBottomNav] = React.useState<React.ReactNode>(null);

  const contextValue = React.useMemo(() => ({ setTitle, setFooter, setBottomNav }), []);
  const valuesValue = React.useMemo(() => ({ title, footer, bottomNav }), [title, footer, bottomNav]);

  return (
    <ShellContext.Provider value={contextValue}>
      <ShellValuesContext.Provider value={valuesValue}>
        {children}
      </ShellValuesContext.Provider>
    </ShellContext.Provider>
  );
}

export function useShell() {
  const context = React.useContext(ShellContext);
  if (!context) {
    throw new Error("useShell must be used within a ShellProvider");
  }
  return context;
}

export function useShellValues() {
  return React.useContext(ShellValuesContext);
}

export function useSetShell(
  {
    title,
    footer,
    bottomNav,
  }: {
    title?: React.ReactNode;
    footer?: React.ReactNode;
  bottomNav?: React.ReactNode;
}) {
  const { setTitle, setFooter, setBottomNav } = useShell();

  React.useEffect(() => {
    setTitle(title ?? null);
    setFooter(footer ?? null);
    setBottomNav(bottomNav ?? null);

    return () => {
      setTitle(null);
      setFooter(null);
      setBottomNav(null);
    };
  }, [setTitle, setFooter, setBottomNav, title, footer, bottomNav]);
}
