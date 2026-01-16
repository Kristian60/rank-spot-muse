import { useState, useRef, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  value: string;
  onSave?: (value: string) => void;
  className?: string;
  inputClassName?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}

export function EditableText({
  value,
  onSave,
  className = "",
  inputClassName = "",
  as: Component = "span",
}: EditableTextProps) {
  const { isAdminMode } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave?.(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (!isAdminMode) {
    return <Component className={className}>{value}</Component>;
  }

  if (isEditing) {
    return (
      <span className="inline-flex items-center gap-1">
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={cn(
            "bg-background border border-primary rounded px-2 py-0.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50",
            inputClassName
          )}
        />
        <button
          onClick={handleSave}
          className="p-1 rounded hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600"
        >
          <Check className="h-3 w-3" />
        </button>
        <button
          onClick={handleCancel}
          className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600"
        >
          <X className="h-3 w-3" />
        </button>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 group">
      <Component className={className}>{value}</Component>
      <button
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-muted transition-opacity"
        title="Edit"
      >
        <Pencil className="h-3 w-3 text-muted-foreground" />
      </button>
    </span>
  );
}
