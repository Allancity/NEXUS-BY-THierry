import "./globals.css";
import PolicyGate from "@/components/PolicyGate";

export const metadata = {
  title: "NEXUS BY THierry",
  description: "Health, Safety and Environment platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PolicyGate>{children}</PolicyGate>
      </body>
    </html>
  );
}
