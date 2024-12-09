import React from "react";
import Turnstile, { useTurnstile } from "react-turnstile";
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
  const turnstile = useTurnstile();
  return (
    <Turnstile
      sitekey={siteKey}
      onVerify={onVerify}
      onError={() => {
        toast.error("Failed to verify captcha!");
        turnstile.reset();
      }}
      retry="auto"
      retryInterval={3000}
      fixedSize={false}
      size="flexible"
      theme="light"
    />
  );
};

export default TurnstileComponent;
