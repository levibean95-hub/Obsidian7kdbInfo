import React, { useState, useRef, useEffect } from 'react';
import './SearchableDropdown.css';

interface SearchableDropdownProps {
    id: string;
    placeholder: string;
    options: string[];
    selectedValue: string;
    onSelect: (value: string) => void;
    onClear: () => void;
    label: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
    id,
    placeholder,
    options,
    selectedValue,
    onSelect,
    onClear,
    label
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const filtered = options.filter(opt =>
            opt.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOptions(filtered);
    }, [searchTerm, options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (value: string) => {
        onSelect(value);
        setIsOpen(false);
        setSearchTerm('');
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClear();
        setSearchTerm('');
    };

    const displayValue = selectedValue || '';
    const showClearButton = !!selectedValue;

    return (
        <div className={`${id}-filter-container`} ref={containerRef}>
            <div className="custom-select-wrapper">
                <input
                    ref={inputRef}
                    type="text"
                    id={`${id}-search-input`}
                    className="effect-search-input"
                    placeholder={placeholder}
                    value={isOpen ? searchTerm : displayValue}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    autoComplete="off"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-dropdown`}
                    aria-haspopup="listbox"
                />
                <div
                    className={`effect-dropdown ${isOpen ? 'show' : ''}`}
                    id={`${id}-dropdown`}
                    role="listbox"
                    aria-label={`${label} options`}
                >
                    <div
                        className={`effect-option ${!selectedValue ? 'selected' : ''}`}
                        data-value=""
                        role="option"
                        onClick={() => handleSelect('')}
                    >
                        All {label}
                    </div>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <div
                                key={option}
                                className={`effect-option ${selectedValue === option ? 'selected' : ''}`}
                                data-value={option}
                                role="option"
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </div>
                        ))
                    ) : (
                        <div className="dropdown-empty">No {label.toLowerCase()} match your search</div>
                    )}
                </div>
                {showClearButton && (
                    <button
                        className="clear-effect-btn"
                        id={`clear-${id}-btn`}
                        onClick={handleClear}
                        title="Clear filter"
                        aria-label={`Clear ${label.toLowerCase()} filter`}
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchableDropdown;

