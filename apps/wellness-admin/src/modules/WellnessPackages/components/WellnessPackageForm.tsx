import * as React from "react";
import { Input } from "@/libs/Common/ui/Input";
import { Button } from "@/libs/Common/ui/Button";
import { CreateWellnessPackageInput, UpdateWellnessPackageInput } from "@wellness/shared-typescript";

interface WellnessPackageFormProps {
  initialData?: UpdateWellnessPackageInput;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

export function WellnessPackageForm({ initialData, onSubmit, isLoading, onCancel, mode }: WellnessPackageFormProps) {
  const [name, setName] = React.useState(initialData?.name || "");
  const [description, setDescription] = React.useState(initialData?.description || "");
  const [price, setPrice] = React.useState(initialData?.price?.toString() || "");
  const [durationMinutes, setDurationMinutes] = React.useState(initialData?.duration_minutes?.toString() || "");

  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="name"
        label="Package Name"
        placeholder="e.g. Digital Wellness Basic"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
        required
      />
      
      <div className="space-y-2 w-full">
        <label className="text-sm font-medium text-slate-300" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[100px] resize-y"
          placeholder="Brief description of the package offerings..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          id="price"
          type="number"
          label="Price (in cents/smallest unit)"
          placeholder="4900"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          disabled={isLoading}
          min="0"
          required
        />
        
        <Input
          id="duration"
          type="number"
          label="Duration (minutes)"
          placeholder="60"
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(e.target.value)}
          disabled={isLoading}
          min="1"
          required
        />
      </div>

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
          disabled={isLoading || !name || !price || !durationMinutes}
        >
          {isLoading ? "Saving..." : mode === 'create' ? "Create Package" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
