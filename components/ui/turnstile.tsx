import React from "react";
import Turnstile from "react-turnstile";
import { toast } from "sonner";

interface TurnstileComponentProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string;

const TurnstileComponent: React.FC<TurnstileComponentProps> = ({
  onVerify,
}) => {
  return (
    <Turnstile
      sitekey={siteKey}
      onVerify={onVerify}
      onError={() => toast.error("Failed to verify captcha!")}
      refreshExpired="auto"
      fixedSize={true}
      size="flexible"
      className="checkbox"
      theme="light"
    />
  );
};

export default TurnstileComponent;
