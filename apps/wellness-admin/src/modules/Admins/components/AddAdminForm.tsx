import { FormEvent, useState } from "react";
import { Input } from "@/libs/Common/ui/Input";
import { Button } from "@/libs/Common/ui/Button";

import { type AddAdminInput } from "@wellness/shared-typescript";

interface AddAdminFormProps {
  onSubmit: (data: AddAdminInput) => void;
  isLoading?: boolean;
  onCancel: () => void;
}

export function AddAdminForm({ onSubmit, isLoading, onCancel }: AddAdminFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ email });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="email"
        type="email"
        label="Admin Email Address"
        placeholder="admin@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        required
      />

      <div className="flex justify-end gap-3 pt-6 border-t border-slate-800">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading || !email}
        >
          {isLoading ? "Adding..." : "Add Admin"}
        </Button>
      </div>
    </form>
  );
}
