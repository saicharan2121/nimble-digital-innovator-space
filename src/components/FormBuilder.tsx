import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight } from "lucide-react";
import { useAISummary, Response as ResponseType } from "@/hooks/useAISummary";
import { Button } from "@/components/ui/button";

const draggableFields = [
  {
    type: "text",
    label: "Text Input",
  },
  {
    type: "email",
    label: "Email Field",
  },
  {
    type: "checkbox",
    label: "Checkbox",
  },
  {
    type: "dropdown",
    label: "Dropdown",
  },
  {
    type: "textarea",
    label: "Textarea",
  },
];

function renderField(field: { type: string }, idx: number) {
  const label = getFieldLabel(field.type, idx);
  const inputName = label;
  switch (field.type) {
    case "text":
      return (
        <div className="space-y-1" key={idx}>
          <label className="block text-sm font-medium text-muted-foreground mb-1">{label}</label>
          <Input
            name={inputName}
            value={formValues[inputName] || ""}
            onChange={handleFormChange}
            placeholder="Type here..."
          />
        </div>
      );
    case "email":
      return (
        <div className="space-y-1" key={idx}>
          <label className="block text-sm font-medium text-muted-foreground mb-1">{label}</label>
          <Input
            name={inputName}
            type="email"
            value={formValues[inputName] || ""}
            onChange={handleFormChange}
            placeholder="email@example.com"
          />
        </div>
      );
    case "checkbox":
      return (
        <div className="flex items-center space-x-3 mb-2" key={idx}>
          <Checkbox
            id={`cb-${idx}`}
            name={inputName}
            checked={(formValues[inputName] || "") === "Checked"}
            onCheckedChange={(checked: boolean) => {
              setFormValues((vals) => ({
                ...vals,
                [inputName]: checked ? "Checked" : "Unchecked",
              }));
            }}
          />
          <label htmlFor={`cb-${idx}`} className="text-sm text-muted-foreground">
            {label}
          </label>
        </div>
      );
    case "dropdown":
      return (
        <div className="space-y-1" key={idx}>
          <label className="block text-sm font-medium text-muted-foreground mb-1">{label}</label>
          <select
            className="w-full border h-10 rounded-md px-3 py-2 bg-background text-sm"
            name={inputName}
            value={formValues[inputName] || ""}
            onChange={handleFormChange}
          >
            <option value="">Select...</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>
      );
    case "textarea":
      return (
        <div className="space-y-1" key={idx}>
          <label className="block text-sm font-medium text-muted-foreground mb-1">{label}</label>
          <Textarea
            name={inputName}
            value={formValues[inputName] || ""}
            onChange={handleFormChange}
            placeholder="Enter your text..."
          />
        </div>
      );
    default:
      return null;
  }
}

function getFieldLabel(type: string, idx: number) {
  let label = "";
  switch (type) {
    case "text":
      label = "Text Input";
      break;
    case "email":
      label = "Email Field";
      break;
    case "checkbox":
      label = "Checkbox";
      break;
    case "dropdown":
      label = "Dropdown";
      break;
    case "textarea":
      label = "Textarea";
      break;
    default:
      label = type;
  }
  return `${label} ${idx + 1}`;
}

function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  const { name, value, type, checked } = e.target;
  setFormValues((vals) => ({
    ...vals,
    [name]: type === "checkbox" ? (checked ? "Checked" : "Unchecked") : value,
  }));
}

function handleFormSubmit(e: React.FormEvent) {
  e.preventDefault();
  // Include all visible fields
  const resp: ResponseType = {};
  fields.forEach((f, idx) => {
    const key = getFieldLabel(f.type, idx);
    resp[key] = formValues[key] || "";
  });

  // Save this response
  addResponse(resp);
  // Clear form
  setFormValues({});
  setShowSubmitSuccess(true);

  // Generate summary with up-to-date responses
  setTimeout(() => {
    generateSummary([...responses, resp]);
    setShowSubmitSuccess(false);
  }, 700); // short delay for better UI feel
}

const FormBuilder = () => {
  // For simplicity, use a string to represent the dragged type
  const [dragging, setDragging] = useState<string | null>(null);
  const [fields, setFields] = useState<{ type: string }[]>([]);

  // We'll maintain per-field state for the previewed form
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);

  // Integrate AI summary hook here
  const {
    responses,
    addResponse,
    generateSummary,
    summary,
    isLoading: isSummarizing,
    error: summaryError,
  } = useAISummary();

  function handleDragStart(type: string) {
    setDragging(type);
  }

  function handleDragEnd() {
    setDragging(null);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (dragging) {
      setFields(prev => [...prev, { type: dragging }]);
      setDragging(null);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  return (
    <section className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 py-10">
      {/* Left Column: Draggable Fields */}
      <div className="md:w-1/3 w-full flex flex-col gap-4">
        <h2 className="font-bold text-xl mb-2 text-primary">Form Elements</h2>
        {draggableFields.map(field => (
          <Card
            key={field.type}
            className="flex items-center gap-2 px-4 py-3 cursor-grab select-none transition-shadow hover:shadow-lg bg-card"
            draggable
            onDragStart={() => handleDragStart(field.type)}
            onDragEnd={handleDragEnd}
          >
            <span className="flex-1 font-medium">{field.label}</span>
            <ChevronRight className="text-muted-foreground" />
          </Card>
        ))}
      </div>
      {/* Right Column: Drop Zone Live Preview */}
      <div
        className={`md:w-2/3 w-full min-h-[380px] bg-muted/60 rounded-lg border-2 border-dashed border-secondary flex flex-col gap-5 px-8 py-8 transition-colors ${dragging ? "border-primary" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h2 className="font-bold text-xl mb-6 text-primary">Live Preview</h2>
        {fields.length === 0 ? (
          <div className="text-center text-muted-foreground text-base mt-12">
            Drag form elements here to add them to your form
          </div>
        ) : (
          <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
            {fields.map((field, idx) => renderField(field, idx))}
            <Button type="submit" className="mt-4 max-w-xs self-end">
              Submit Response
            </Button>
          </form>
        )}
        {showSubmitSuccess && (
          <div className="text-green-700 py-2 font-semibold text-right">Response submitted!</div>
        )}
      </div>
    </section>
  );
};

export default FormBuilder;
