import React from "react";
import "./ConfirmationModal.css";

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    isDanger?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title,
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    isDanger = false,
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null;

    return (
        <div className="confirmation-modal-overlay" onClick={onCancel}>
            <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
                <div className="confirmation-modal-header">
                    <h3>{title}</h3>
                    <button className="close-btn" onClick={onCancel}>
                        &times;
                    </button>
                </div>
                <div className="confirmation-modal-content">
                    <p>{message}</p>
                </div>
                <div className="confirmation-modal-actions">
                    <button className="confirmation-btn confirmation-btn-cancel" onClick={onCancel}>
                        {cancelLabel}
                    </button>
                    <button
                        className={`confirmation-btn confirmation-btn-confirm ${isDanger ? "danger" : ""}`}
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
