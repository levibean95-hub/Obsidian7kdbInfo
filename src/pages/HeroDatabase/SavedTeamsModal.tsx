import React, { useState, useEffect } from "react";
import type { SavedLoadout } from "../../lib/types";
import ConfirmationModal from "../../components/UI/ConfirmationModal";
import "./SavedTeamsModal.css";

interface SavedTeamsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoad: (data: string) => void;
    currentData: string;
}

const STORAGE_KEY = "teamBuilder_savedLoadouts";

const SavedTeamsModal: React.FC<SavedTeamsModalProps> = ({
    isOpen,
    onClose,
    onLoad,
    currentData,
}) => {
    const [savedLoadouts, setSavedLoadouts] = useState<SavedLoadout[]>([]);
    const [newSaveName, setNewSaveName] = useState("");
    const [confirmationModal, setConfirmationModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
        isDanger?: boolean;
    } | null>(null);

    // Load saved teams from localStorage on mount
    useEffect(() => {
        const loadSavedTeams = () => {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    setSavedLoadouts(JSON.parse(stored));
                }
            } catch (error) {
                console.error("Failed to load saved teams:", error);
            }
        };

        if (isOpen) {
            loadSavedTeams();
            setNewSaveName("");
        }
    }, [isOpen]);

    const handleSave = () => {
        if (!newSaveName.trim()) return;

        const newLoadout: SavedLoadout = {
            id: crypto.randomUUID(),
            name: newSaveName.trim(),
            timestamp: Date.now(),
            data: currentData,
        };

        const updatedLoadouts = [newLoadout, ...savedLoadouts];
        setSavedLoadouts(updatedLoadouts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLoadouts));
        setNewSaveName("");
    };

    const handleDelete = (id: string) => {
        setConfirmationModal({
            isOpen: true,
            title: "Delete Saved Team",
            message: "Are you sure you want to delete this saved team?",
            isDanger: true,
            onConfirm: () => {
                const updatedLoadouts = savedLoadouts.filter((l) => l.id !== id);
                setSavedLoadouts(updatedLoadouts);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLoadouts));
                setConfirmationModal(null);
            },
        });
    };

    const handleLoad = (loadout: SavedLoadout) => {
        setConfirmationModal({
            isOpen: true,
            title: "Load Team",
            message: `Load "${loadout.name}"? This will overwrite your current teams.`,
            onConfirm: () => {
                onLoad(loadout.data);
                onClose();
                setConfirmationModal(null);
            },
        });
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (!isOpen) return null;

    return (
        <div className="saved-teams-modal-overlay" onClick={onClose}>
            <div
                className="saved-teams-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="saved-teams-header">
                    <h2>Saved Teams</h2>
                    <button className="btn-close-modal" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className="saved-teams-content">
                    <div className="save-current-section">
                        <h3>Save Current Setup</h3>
                        <div className="save-input-group">
                            <input
                                type="text"
                                className="save-name-input"
                                placeholder="Enter a name for this setup..."
                                value={newSaveName}
                                onChange={(e) => setNewSaveName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSave();
                                }}
                            />
                            <button
                                className="btn-save-new"
                                onClick={handleSave}
                                disabled={!newSaveName.trim()}
                            >
                                Save
                            </button>
                        </div>
                    </div>

                    <div className="saved-list-section">
                        <h3>Your Saved Teams</h3>
                        <div className="saved-list">
                            {savedLoadouts.length === 0 ? (
                                <div className="saved-list-empty">
                                    No saved teams yet. Save your current setup above!
                                </div>
                            ) : (
                                savedLoadouts.map((loadout) => (
                                    <div key={loadout.id} className="saved-item">
                                        <div className="saved-item-info">
                                            <span className="saved-item-name">{loadout.name}</span>
                                            <span className="saved-item-date">
                                                {formatDate(loadout.timestamp)}
                                            </span>
                                        </div>
                                        <div className="saved-item-actions">
                                            <button
                                                className="btn-load-team"
                                                onClick={() => handleLoad(loadout)}
                                            >
                                                Load
                                            </button>
                                            <button
                                                className="btn-delete-team"
                                                onClick={() => handleDelete(loadout.id)}
                                                title="Delete"
                                            >
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {confirmationModal && (
                <ConfirmationModal
                    isOpen={confirmationModal.isOpen}
                    title={confirmationModal.title}
                    message={confirmationModal.message}
                    onConfirm={confirmationModal.onConfirm}
                    onCancel={() => setConfirmationModal(null)}
                    isDanger={confirmationModal.isDanger}
                />
            )}
        </div>
    );
};

export default SavedTeamsModal;
