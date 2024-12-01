import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
type Props = {};
type formStatus = "loading" | "submitting" | "success" | "error";
export default function Reset({}: Props) {
  const [status, setStatus] = useState<formStatus>("loading");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  return <div>page</div>;
}
