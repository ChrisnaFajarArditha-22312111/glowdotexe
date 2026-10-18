/** Definisi ilustrasi botol skincare (dipakai ulang lewat <use href="#...">). */
export default function SvgDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <symbol id="serum" viewBox="0 0 80 160">
          <rect x="30" y="4" width="20" height="34" rx="10" fill="#2d2326" />
          <rect x="24" y="34" width="32" height="12" rx="3" fill="#d9b88f" />
          <rect x="12" y="46" width="56" height="108" rx="16" fill="#fff" fillOpacity=".85" />
          <rect x="16" y="84" width="48" height="66" rx="12" fill="currentColor" opacity=".45" />
          <rect x="24" y="98" width="32" height="34" rx="4" fill="#fff" />
          <rect x="29" y="106" width="22" height="3" fill="currentColor" />
          <rect x="29" y="113" width="14" height="2" fill="currentColor" opacity=".6" />
        </symbol>
        <symbol id="pump" viewBox="0 0 80 170">
          <rect x="26" y="2" width="28" height="9" rx="4.5" fill="#2d2326" />
          <rect x="46" y="2" width="22" height="6" rx="3" fill="#2d2326" />
          <rect x="37" y="10" width="6" height="16" fill="#d9b88f" />
          <rect x="26" y="26" width="28" height="9" rx="2" fill="#d9b88f" />
          <rect x="10" y="34" width="60" height="134" rx="18" fill="currentColor" />
          <rect x="20" y="84" width="40" height="54" rx="6" fill="#fff" />
          <rect x="26" y="94" width="28" height="3.5" fill="currentColor" />
          <rect x="26" y="102" width="18" height="2.5" fill="currentColor" opacity=".6" />
          <rect x="16" y="42" width="6" height="70" rx="3" fill="#fff" opacity=".3" />
        </symbol>
        <symbol id="jar" viewBox="0 0 120 80">
          <rect x="6" y="3" width="108" height="26" rx="8" fill="#fff" />
          <rect x="6" y="22" width="108" height="5" fill="#d9b88f" />
          <rect x="10" y="29" width="100" height="49" rx="15" fill="currentColor" />
          <rect x="34" y="40" width="52" height="26" rx="5" fill="#fff" />
          <rect x="42" y="48" width="36" height="3" fill="currentColor" />
          <rect x="48" y="55" width="24" height="2.5" fill="currentColor" opacity=".6" />
        </symbol>
        <symbol id="tube" viewBox="0 0 70 170">
          <rect x="8" y="2" width="54" height="12" rx="2" fill="currentColor" opacity=".7" />
          <path d="M8 14H62L56 142H14Z" fill="#fff" />
          <rect x="18" y="142" width="34" height="26" rx="6" fill="currentColor" />
          <rect x="18" y="52" width="34" height="46" rx="6" fill="currentColor" opacity=".25" />
          <rect x="23" y="62" width="24" height="3.5" fill="currentColor" />
          <rect x="23" y="70" width="15" height="2.5" fill="currentColor" opacity=".6" />
        </symbol>
      </defs>
    </svg>
  );
}
