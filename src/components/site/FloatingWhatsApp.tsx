import { waLink, waMessages } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink(waMessages.floating)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] pl-4 pr-5 py-3 shadow-[0_10px_40px_-10px_rgba(37,211,102,0.6)] hover:shadow-[0_14px_50px_-10px_rgba(37,211,102,0.8)] transition-shadow float-soft"
    >
      <span className="relative grid place-items-center h-9 w-9 rounded-full bg-white">
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="#25D366" aria-hidden>
          <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.376.692 4.586 1.884 6.448L4 29l7.74-1.86A11.93 11.93 0 0 0 16 27c6.628 0 12-5.373 12-12S22.629 3 16.001 3zm0 21.6c-1.78 0-3.466-.48-4.92-1.32l-.353-.21-4.594 1.104 1.13-4.476-.23-.366A9.55 9.55 0 0 1 6.4 15c0-5.293 4.307-9.6 9.6-9.6 5.293 0 9.6 4.307 9.6 9.6.001 5.293-4.306 9.6-9.6 9.6zm5.272-7.176c-.288-.144-1.705-.84-1.97-.937-.264-.096-.456-.144-.648.145-.192.288-.744.937-.912 1.128-.168.192-.336.216-.624.072-.288-.144-1.216-.448-2.317-1.43-.857-.764-1.434-1.708-1.602-1.996-.168-.288-.018-.443.126-.587.13-.13.288-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.561-.888-2.137-.233-.561-.471-.485-.648-.494l-.552-.01c-.192 0-.504.072-.768.36-.264.288-1.008.984-1.008 2.4 0 1.416 1.032 2.784 1.176 2.976.144.192 2.03 3.1 4.92 4.345.688.297 1.224.475 1.642.608.69.22 1.318.189 1.814.115.554-.083 1.705-.697 1.946-1.371.24-.673.24-1.25.168-1.371-.072-.12-.264-.192-.552-.336z" />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-white">
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75" />
          <span className="absolute inset-0.5 rounded-full bg-[#25D366]" />
        </span>
      </span>
      <span className="hidden sm:block text-sm font-medium text-white pr-1">Chat with us</span>
    </a>
  );
}

