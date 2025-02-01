interface IconProps {
  className?: string;
}

function IconProfileEmpty({ className }: IconProps) {
  return (
    <svg
      className={className || ''}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="12" fill="#334155" />
      <circle cx="12" cy="12" r="11.5" stroke="#F8FAFC" strokeOpacity="0.1" />
      <path
        d="M5.49558 13.9785C6.12817 17.3703 9.39055 19.607 12.7823 18.9744C16.1741 18.3418 18.4108 15.0795 17.7782 11.6877C17.1456 8.29595 13.8832 6.0592 10.4915 6.6918C7.09973 7.32439 4.86299 10.5868 5.49558 13.9785Z"
        fill="#64748B"
      />
      <circle
        cx="1.56181"
        cy="1.56181"
        r="1.56181"
        transform="matrix(-0.983048 0.183347 0.183347 0.983048 6.75781 11.7339)"
        fill="#64748B"
      />
      <ellipse
        cx="1.56181"
        cy="1.5618"
        rx="1.56181"
        ry="1.5618"
        transform="matrix(-0.983048 0.183347 0.183347 0.983048 19.0703 11.7339)"
        fill="#64748B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.37698 11.2589C6.30992 11.9015 7.48862 12.1688 8.66978 11.9036C9.86801 11.6345 10.8297 10.8711 11.3952 9.87031C12.2985 11.4634 14.1422 12.3541 15.992 11.9387C16.6561 11.7896 17.2474 11.4887 17.739 11.0797C17.7204 10.972 17.6991 10.8643 17.6749 10.7565C16.9052 7.32889 13.5522 5.1631 10.1858 5.91903C7.56199 6.50821 5.7044 8.6984 5.37698 11.2589Z"
        fill="#1E293B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.1307 7.77168L7.02491 7.68551C7.24076 5.92449 9.21619 4.55903 11.6076 4.58166C13.9989 4.60429 15.9482 6.00689 16.1307 7.77168Z"
        fill="#475569"
      />
      <rect
        x="5.50781"
        y="7.66895"
        width="12.1418"
        height="1.51772"
        rx="0.505908"
        transform="rotate(0.542194 5.50781 7.66895)"
        fill="#475569"
      />
      <path
        d="M10.0794 5.68855C10.0873 4.85037 10.7732 4.17733 11.6114 4.18526C12.4496 4.19319 13.1226 4.8791 13.1147 5.71728L13.0956 7.74082L10.0602 7.7121L10.0794 5.68855Z"
        fill="#334155"
      />
    </svg>
  );
}

export default IconProfileEmpty;
