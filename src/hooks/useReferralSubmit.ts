import { useState } from 'react';

interface Referral {
  referrerName: string;
  referrerEmail: string;
  refereeName: string;
  refereeEmail: string;
  course: string;
}

export const useReferralSubmit = (reset: () => void, onClose: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const submitReferral = async (data: Referral) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/api/referrals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setSubmitStatus("success");
      reset();
      setTimeout(() => {
        onClose();
        setSubmitStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitReferral, isSubmitting, submitStatus };
};