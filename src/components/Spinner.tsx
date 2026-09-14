export function Spinner({ size = 48, label }: { size?: number; label?: string }) {
  const dimensions = Math.max(size, 40);

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-12"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex items-center justify-center" style={{ width: dimensions, height: dimensions }}>
        <svg
          className="overflow-visible"
          width="100%"
          height="100%"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <style>{`
            /* Fluid assembly of the code symbol */
            @keyframes codeAppear {
              0% { opacity: 0; transform: scale(0.2); }
              15% { opacity: 1; transform: scale(1); }
              100% { opacity: 1; transform: scale(1); }
            }

            /* Fluid packaging into the box */
            @keyframes boxAppear {
              0%, 10% { opacity: 0; transform: scale(0.4); }
              25% { opacity: 1; transform: scale(1); }
              100% { opacity: 1; transform: scale(1); }
            }

            /* Fluid attachment of the paper plane */
            @keyframes planeAppear {
              0%, 20% { opacity: 0; transform: translateY(6px) scale(0.8); }
              35% { opacity: 1; transform: translateY(0) scale(1); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }

            /* Continuous diagonal flight path from bottom-left to top-right with top-right tilt */
            @keyframes smoothFlight {
              0% { 
                transform: translate(-20px, 20px) rotate(-45deg); 
                opacity: 0; 
              }
              15% { 
                opacity: 1; 
              }
              80% { 
                transform: translate(18px, -18px) rotate(-45deg); 
                opacity: 1; 
              }
              95%, 100% { 
                transform: translate(24px, -24px) rotate(-45deg); 
                opacity: 0; 
              }
            }

            .flight-group {
              animation: smoothFlight 2.8s linear infinite;
              transform-origin: center;
            }

            .code-part {
              animation: codeAppear 2.8s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
              transform-origin: center;
            }

            .box-part {
              animation: boxAppear 2.8s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
              transform-origin: center;
            }

            .plane-part {
              animation: planeAppear 2.8s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
              transform-origin: center;
            }
          `}</style>

          {/* Master group handling continuous bottom-left to top-right motion */}
          <g className="flight-group">
            {/* Paper Plane */}
            <g className="plane-part">
              <path
                d="M12 52L52 32L12 12V28L36 32L12 36V52Z"
                className="fill-accent stroke-current"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>

            {/* Shipping Box + Code Symbol */}
            <g transform="translate(24, 18) scale(0.75)">
              <g className="box-part">
                <rect x="2" y="6" width="20" height="16" rx="2" className="fill-florante-100 stroke-current" strokeWidth="2" />
                <path d="M2 11H22" className="stroke-current" strokeWidth="2" />
                <path d="M12 6V22" className="stroke-current" strokeWidth="2" />
              </g>

              <g className="code-part">
                <text
                  x="12"
                  y="17"
                  textAnchor="middle"
                  className="fill-current font-mono font-bold"
                  fontSize="10"
                >
                  &lt;/&gt;
                </text>
              </g>
            </g>
          </g>
        </svg>
      </div>

      {label && (
        <span className="text-xs font-medium uppercase tracking-widest text-gray-600">
          {label}
        </span>
      )}
    </div>
  );
}