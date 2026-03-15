import { FormEvent, useState } from "react";
import { UpdateWellnessPackageInput } from "@wellness/shared-typescript";

export interface UseWellnessPackageFormProps {
  initialData?: UpdateWellnessPackageInput;
  onSubmit: (data: any) => void;
}

export function useWellnessPackageForm({ initialData, onSubmit }: UseWellnessPackageFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [durationMinutes, setDurationMinutes] = useState(initialData?.duration_minutes?.toString() || "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Convert string inputs back to numbers before submission
    const data = {
      name,
      description: description || null,
      price: parseInt(price, 10),
      duration_minutes: parseInt(durationMinutes, 10),
    };

    onSubmit(data);
  };

  return {
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    durationMinutes,
    setDurationMinutes,
    handleSubmit
  };
}
