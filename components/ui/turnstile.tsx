import React from "react";
import Turnstile from "react-turnstile";

interface TurnstileComponentProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string;

const TurnstileComponent: React.FC<TurnstileComponentProps> = ({
  onVerify,
  onExpire,
  onError,
}) => {
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
