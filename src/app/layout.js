import "./globals.css";

export const metadata = {
  title: "Parth Pandey — Network & Security AI Engineer",
  description:
    "Portfolio of Parth Pandey — Network & Security AI Engineer with expertise in Check Point, Palo Alto, Zscaler Zero Trust, Splunk SIEM, AWS Cloud Security, and SOC Blue Team operations.",
  keywords:
    "Parth Pandey, Cybersecurity, Network Security, SOC Analyst, SIEM, Splunk, Check Point, Palo Alto, Zscaler, AWS, Portfolio",
  authors: [{ name: "Parth Pandey" }],
  openGraph: {
    title: "Parth Pandey — Network & Security AI Engineer",
    description:
      "Interactive cybersecurity portfolio showcasing expertise in enterprise firewalls, zero-trust, SIEM, and cloud security.",
    type: "website",
  },
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
