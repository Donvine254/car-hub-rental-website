import React from "react";
import Turnstile from "react-turnstile";

interface TurnstileComponentProps {
  onVerify: (token: string) => void; 
  onExpire?: () => void; 
  onError?: () => void; 
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY; 

const TurnstileComponent: React.FC<TurnstileComponentProps> = ({
  onVerify,
  onExpire,
  onError,
}) => {
  if (!siteKey) {
    console.error("Turnstile siteKey is not set.");
    return <div>Error: CAPTCHA siteKey is missing.</div>; // Handle missing siteKey gracefully
  }

  return (
    <Turnstile
      sitekey={siteKey}
      onVerify={onVerify}
      onExpire={onExpire}
      onError={onError}
      refreshExpired="auto"
      fixedSize={true}
    />
  );
};

export default TurnstileComponent;
