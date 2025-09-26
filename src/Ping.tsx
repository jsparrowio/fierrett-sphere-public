import React, { useEffect, useState, useRef } from "react";
import Spinner from 'react-bootstrap/Spinner';

function SpinningCircle() {
    return <Spinner animation="border" />;
}

interface IpPingerProps {
    ip: string;                         // Target IP or hostname
    redirectUrl: string;               // Where to redirect if ping succeeds
    timeoutMs?: number;                // Timeout for each probe (default: 3000ms)
    backendPingUrl?: string | null;   // Optional backend ping API e.g. "/api/ping?ip="
    autoStart?: boolean;              // Start automatically (default: true)
}

type PingStatus = "idle" | "probing" | "alive" | "dead" | "error";

const handleButtonClick = () => {
    window.location.href = 'https://sso.fierrettsphere.com';
};

const IpPinger: React.FC<IpPingerProps> = ({
    ip,
    redirectUrl,
    timeoutMs = 3000,
    backendPingUrl = null,
    autoStart = true
}) => {
    const [status, setStatus] = useState<PingStatus>("idle");
    const [step, setStep] = useState<String>("Idle...");
    const aborted = useRef<boolean>(false);

    useEffect(() => {
        if (!autoStart || !ip) return;

        aborted.current = false;
        setStatus("probing");
        setStep(`Checking connection to the Fierrett Sphere...`);

        // --- IMAGE PROBE ---
        const tryImage = (): Promise<boolean> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                let settled = false;

                const timer = setTimeout(() => {
                    if (settled) return;
                    settled = true;
                    img.onload = img.onerror = null;
                    reject(new Error("image timeout"));
                }, timeoutMs);

                img.onload = () => {
                    if (settled) return;
                    settled = true;
                    clearTimeout(timer);
                    img.onload = img.onerror = null;
                    resolve(true);
                };

                img.onerror = () => {
                    if (settled) return;
                    settled = true;
                    clearTimeout(timer);
                    img.onload = img.onerror = null;
                    reject(new Error("image error"));
                };

                img.src = `${ip}/favicon.ico?_=${Date.now()}`;
            });
        };

        // --- FETCH PROBE ---
        const tryFetch = (): Promise<boolean> => {
            return new Promise((resolve, reject) => {
                const controller = new AbortController();
                const signal = controller.signal;

                const timer = setTimeout(() => {
                    controller.abort();
                    reject(new Error("fetch timeout"));
                }, timeoutMs);

                fetch(`ip`, { method: "GET", mode: "no-cors", signal })
                    .then(() => {
                        clearTimeout(timer);
                        resolve(true); // Opaque response = reachable
                    })
                    .catch((err) => {
                        clearTimeout(timer);
                        reject(err);
                    });
            });
        };

        // --- BACKEND PING PROBE ---
        const tryBackend = (): Promise<boolean> => {
            if (!backendPingUrl) return Promise.reject(new Error("No backend URL"));

            return new Promise((resolve, reject) => {
                const timer = setTimeout(() => {
                    reject(new Error("backend timeout"));
                }, timeoutMs);

                fetch(`${backendPingUrl}${encodeURIComponent(ip)}`)
                    .then((res) => res.json())
                    .then((json: { alive?: boolean }) => {
                        clearTimeout(timer);
                        if (json && json.alive) resolve(true);
                        else reject(new Error("Backend ping failed"));
                    })
                    .catch((err) => {
                        clearTimeout(timer);
                        reject(err);
                    });
            });
        };

        // --- RUN PROBES IN ORDER ---
        (async () => {
            try {
                // 1. Image probe
                try {
                    await tryImage();
                    if (aborted.current) return;
                    setStatus("alive");
                    setStep(`Connected!`);
                    window.location.href = redirectUrl;
                    return;
                } catch { }

                // 2. Fetch probe
                try {
                    await tryFetch();
                    if (aborted.current) return;
                    setStep(`Connected!`);
                    setStatus("alive");
                    window.location.href = redirectUrl;
                    return;
                } catch {
                    if (!aborted.current) {
                        setStep(`Not Connected`);
                        setStatus("dead");
                    }
                }

                // 3. Backend ping
                try {
                    await tryBackend();
                    if (aborted.current) return;
                    setStep(`Connected!`);
                    setStatus("alive");
                    window.location.href = redirectUrl;
                    return;
                } catch {
                    if (!aborted.current) {
                        setStep(`Not Connected`);
                        setStatus("dead");
                    }
                }


            } catch {
                if (!aborted.current) setStatus("error");
            }
        })();

        return () => {
            aborted.current = true;
        };
    }, [ip, redirectUrl, timeoutMs, backendPingUrl, autoStart]);

    return (
        <div style={{ fontFamily: "system-ui, sans-serif" }}>
            <p>Status: <strong>{step}</strong></p>
            {status === "probing" &&
                <SpinningCircle />
            }
            {status === "dead" &&
                <>
                    <p className="message">
                        Hi, you've reached the landing page for the Fierrett Sphere! This is a private site that requires access to the Fierrett Sphere network. If you are seeing this page, you were not detected on the Fierrett Sphere network. If you believe you have reached this page in error, contact the administrator.
                    </p>

                </>
            }
            {status === "alive" &&
                <>
                    <p>Redirecting…</p>
                    <button className="access-button" onClick={handleButtonClick}>
                        Access Portal
                    </button>
                </>
            }
            {status === "error" && <p>There was an error during the ping process.</p>}
        </div>
    );
};

export default IpPinger;
