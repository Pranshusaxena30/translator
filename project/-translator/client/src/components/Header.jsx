import { Languages } from "lucide-react";

export default function Header() {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-icon">
          <Languages size={22} strokeWidth={2.4} />
        </div>
        <div>
          <h1>TranslateNow</h1>
          <p>Fast, simple language translation</p>
        </div>
      </div>
    </header>
  );
}
