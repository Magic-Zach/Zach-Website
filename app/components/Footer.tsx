/* Minimal footer — just copyright and a gold rule above */
export default function Footer() {
  return (
    <footer
      className="py-8 px-6 text-center"
      style={{ borderTop: "1px solid rgba(196, 154, 60, 0.3)", background: "#FBF7EE" }}
    >
      <p
        className="font-mono"
        style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#1C1A14", opacity: 0.35 }}
      >
        © {new Date().getFullYear()} ZACH LIPKIN
      </p>
    </footer>
  );
}
