type IconProps = { className?: string };

export const ArrowUpRight = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="M6 14 14 6m0 0H7m7 0v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowRight = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="M4 10h12m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowLeft = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="M16 10H4m0 0 4-4m-4 4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Star = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
    <path d="M10 1.6 12.6 7l5.9.85-4.27 4.16 1 5.87L10 15.13 4.77 17.88l1-5.87L1.5 7.85 7.4 7Z" />
  </svg>
);

export const Play = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
    <path d="M6 4.5v11l9-5.5z" />
  </svg>
);

export const Doc = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="M5 3h7l3 3v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 3v3h3M7 10h6M7 13h6M7 7h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Article = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <rect x="3" y="4" width="14" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 8h8M6 11h8M6 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Hammer = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="m13 7 4 4-2 2-4-4M3 17l8-8M11 9l3-3 3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Project = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="M3 4.5h6l1.5 2H17v9a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 2 15.5v-10A1 1 0 0 1 3 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const Users = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 17a5 5 0 0 1 10 0M14 5a3 3 0 1 1 0 6M13 17a5 5 0 0 1 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Calendar = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <rect x="3" y="5" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 9h14M7 3v3M13 3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Clock = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Check = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="m4 10.5 4 4 8-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Sparkles = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
    <path d="M10 1.5 11.4 6 16 7.4 11.4 8.8 10 13.4 8.6 8.8 4 7.4 8.6 6Zm5 9 .8 2 2 .8-2 .8L15 16l-.8-1.9-2-.8 2-.8ZM4.5 12l.6 1.5L6.6 14l-1.5.6L4.5 16l-.6-1.4L2.5 14l1.4-.5Z" />
  </svg>
);

export const Upvote = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="m4 11 6-6 6 6M10 5v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Comment = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="M3.5 4.5h13a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1h-3.5L10 17l-3-3H3.5a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const Bookmark = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="M5 3h10v14l-5-3-5 3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const LinkIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="M11 6h3a3 3 0 1 1 0 6h-3M9 14H6a3 3 0 1 1 0-6h3M7 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Home = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="m2.5 9 7.5-6 7.5 6v8a1 1 0 0 1-1 1h-4v-6H8v6H3.5a1 1 0 0 1-1-1V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const Compass = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="m7.5 12.5 1.2-3.8 3.8-1.2-1.2 3.8-3.8 1.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const Tools = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="m12 3 5 5-2.5 2.5L9.5 5.5 12 3ZM3.5 16.5l3-1 7-7-2-2-7 7-1 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const Briefcase = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <rect x="2.5" y="6" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.5 6V4.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V6" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const Megaphone = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="M2.5 9v2l9 4V5l-9 4Zm12-2v6M3 11a2 2 0 0 0 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const Layers = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="m10 3 7 4-7 4-7-4 7-4ZM3 11l7 4 7-4M3 14l7 4 7-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const Plus = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const Search = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="m13.5 13.5 3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Bell = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="M5 8a5 5 0 1 1 10 0v4l1.2 2.5h-12.4L5 12V8Zm3.5 8.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const ChevronUp = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="m5 12 5-5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronDown = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Code = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="m7 7-4 3 4 3M13 7l4 3-4 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Sun = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Moon = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="M16.5 11.5A7 7 0 0 1 8.5 3.5a7 7 0 1 0 8 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const Heart = ({ className, filled }: IconProps & { filled?: boolean }) => (
  <svg viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"} className={className} aria-hidden>
    <path d="M10 17S3 12.5 3 7.8a4 4 0 0 1 7-2.6 4 4 0 0 1 7 2.6c0 4.7-7 9.2-7 9.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const UserPlus = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 17a6 6 0 0 1 12 0M16 6v5M13.5 8.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const UserCheck = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 17a6 6 0 0 1 12 0M14.5 9 16 10.5 19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Grid = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <rect x="3" y="3" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="3" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3" y="11" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="11" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const Rows = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <rect x="3" y="4" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3" y="8.5" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="3" y="13" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const MapPin = ({ className }: IconProps) => (
  <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
    <path d="M10 18s6-5 6-10a6 6 0 1 0-12 0c0 5 6 10 6 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
