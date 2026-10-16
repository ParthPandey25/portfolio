import "./globals.css";

export const metadata = {
  title: "Parth Pandey — Cybersecurity Engineer | Red Team & Blue Team",
  description:
    "Portfolio of Parth Pandey — Cybersecurity Engineer with expertise in Red Teaming, Blue Teaming, Check Point, Palo Alto, Zscaler Zero Trust, Splunk SIEM, AWS Cloud Security, and SOC operations.",
  keywords:
    "Parth Pandey, Cybersecurity, Network Security, SOC Analyst, SIEM, Splunk, Check Point, Palo Alto, Zscaler, AWS, Portfolio",
  authors: [{ name: "Parth Pandey" }],
  openGraph: {
    title: "Parth Pandey — Cybersecurity Engineer | Red Team & Blue Team",
    description:
      "Interactive cybersecurity portfolio showcasing expertise in enterprise firewalls, zero-trust, SIEM, ethical hacking, and cloud security.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020617",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#020617] text-slate-300">
        {children}
      </body>
    </html>
  );
}
