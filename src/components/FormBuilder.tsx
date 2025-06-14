
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight } from "lucide-react";

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
  switch (field.type) {
    case "text":
      return (
        <div className="space-y-1" key={idx}>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Text Input</label>
          <Input placeholder="Type here..." />
        </div>
      );
    case "email":
      return (
        <div className="space-y-1" key={idx}>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Email Field</label>
          <Input type="email" placeholder="email@example.com" />
        </div>
      );
    case "checkbox":
      return (
        <div className="flex items-center space-x-3 mb-2" key={idx}>
          <Checkbox id={`cb-${idx}`} />
          <label htmlFor={`cb-${idx}`} className="text-sm text-muted-foreground">
            Checkbox Label
          </label>
        </div>
      );
    case "dropdown":
      return (
        <div className="space-y-1" key={idx}>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Dropdown</label>
          <select className="w-full border h-10 rounded-md px-3 py-2 bg-background text-sm">
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>
      );
    case "textarea":
      return (
        <div className="space-y-1" key={idx}>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Textarea</label>
          <Textarea placeholder="Enter your text..." />
        </div>
      );
    default:
      return null;
  }
}

const FormBuilder = () => {
  // For simplicity, use a string to represent the dragged type
  const [dragging, setDragging] = useState<string | null>(null);
  const [fields, setFields] = useState<{ type: string }[]>([]);

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
          <form className="flex flex-col gap-6">
            {fields.map((field, idx) => renderField(field, idx))}
          </form>
        )}
      </div>
    </section>
  );
};

export default FormBuilder;
