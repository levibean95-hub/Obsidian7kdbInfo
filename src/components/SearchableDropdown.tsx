import { useState, useRef, useEffect } from "react";

interface SearchableDropdownProps {
  placeholder: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function SearchableDropdown({
  placeholder,
  options,
  selectedValue,
  onSelect,
  className = "",
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={selectedValue || searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full px-4 py-2 rounded-lg focus:outline-none pr-8 transition-colors"
          style={{
            backgroundColor: "var(--color-bg-card)",
            border: "1px solid rgba(147, 112, 219, 0.4)",
            color: "var(--color-text-primary)",
          }}
          onFocus={(e) => {
            setIsOpen(true);
            e.currentTarget.style.borderColor = "rgba(147, 112, 219, 0.6)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(147, 112, 219, 0.4)";
          }}
        />
        {selectedValue && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect("");
              setSearchTerm("");
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xl leading-none transition-colors"
            style={{ color: "var(--color-text-tertiary)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-tertiary)";
            }}
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto border"
          style={{
            backgroundColor: "var(--color-bg-card)",
            borderColor: "rgba(147, 112, 219, 0.4)",
          }}
        >
          <div
            onClick={() => {
              onSelect("");
              setIsOpen(false);
            }}
            className="px-4 py-2 cursor-pointer transition-colors"
            style={{
              backgroundColor: !selectedValue
                ? "rgba(147, 112, 219, 0.2)"
                : "transparent",
              color: "var(--color-text-primary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--color-bg-tertiary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = !selectedValue
                ? "rgba(147, 112, 219, 0.2)"
                : "transparent";
            }}
          >
            All {placeholder.replace("Filter by ", "").replace("...", "")}
          </div>
          {filteredOptions.map((option) => (
            <div
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="px-4 py-2 cursor-pointer transition-colors"
              style={{
                backgroundColor:
                  selectedValue === option
                    ? "rgba(147, 112, 219, 0.2)"
                    : "transparent",
                color: "var(--color-text-primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-bg-tertiary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  selectedValue === option
                    ? "rgba(147, 112, 219, 0.2)"
                    : "transparent";
              }}
            >
              {option}
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <div
              className="px-4 py-2 text-sm"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              No matches found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
