import React, { useState } from 'react';
import {
  X,
  Star,
  Edit2,
  Trash2,
  Calendar,
  CheckCircle2,
  Sparkles,
  Tag,
  Clock,
  Layers,
} from 'lucide-react';
import { ClothingItem, ItemStatus } from '../../types/closet.js';
import { ConfirmationModal } from '../common/ConfirmationModal.js';

interface ClothingDetailModalProps {
  item: ClothingItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (item: ClothingItem) => void;
  onDelete: (item: ClothingItem) => void;
  onToggleFavorite: (item: ClothingItem) => void;
  onUpdateStatus: (item: ClothingItem, status: ItemStatus) => void;
  onRecordWorn: (item: ClothingItem) => void;
}

export const ClothingDetailModal: React.FC<ClothingDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onToggleFavorite,
  onUpdateStatus,
  onRecordWorn,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isOpen || !item) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
        <div className="bg-[#FAF7F2] border border-[#E8E2D8] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-stone-700 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image preview */}
          <div className="w-full md:w-1/2 bg-stone-100 relative min-h-[300px] md:min-h-full">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover object-center max-h-[420px] md:max-h-none"
            />
            <button
              onClick={() => onToggleFavorite(item)}
              className={`absolute top-4 left-4 p-2.5 rounded-full shadow-md backdrop-blur-sm transition-all cursor-pointer ${
                item.is_favorite
                  ? 'bg-[#1E392A] text-[#C2A674]'
                  : 'bg-white/80 text-stone-500 hover:text-amber-500'
              }`}
            >
              <Star className={`w-5 h-5 ${item.is_favorite ? 'fill-[#C2A674]' : ''}`} />
            </button>
          </div>

          {/* Right Column: Detailed info & actions */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {item.brand || 'Unbranded'} • {item.category}
                </span>
                <h2 className="font-editorial text-2xl font-bold text-[#1C1917] mt-1 leading-snug">
                  {item.name}
                </h2>
              </div>

              {/* Status Switcher Bar */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Availability Status
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-200/60 rounded-2xl text-xs font-semibold">
                  {(['clean', 'in_laundry', 'unavailable'] as ItemStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => onUpdateStatus(item, st)}
                      className={`py-1.5 px-2 rounded-xl transition-all capitalize cursor-pointer text-center ${
                        item.status === st
                          ? 'bg-[#1E392A] text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-white rounded-2xl border border-[#E8E2D8] text-xs">
                <div>
                  <span className="text-stone-400 font-medium block">Color</span>
                  <span className="font-semibold text-stone-800">{item.color}</span>
                </div>
                <div>
                  <span className="text-stone-400 font-medium block">Size</span>
                  <span className="font-semibold text-stone-800">{item.size || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-stone-400 font-medium block">Times Worn</span>
                  <span className="font-semibold text-[#1E392A]">{item.times_worn || 0} times</span>
                </div>
                <div>
                  <span className="text-stone-400 font-medium block">Last Worn</span>
                  <span className="font-semibold text-stone-800">{item.last_worn || 'Never recorded'}</span>
                </div>
              </div>

              {/* Seasons and Occasions tags */}
              <div className="space-y-2">
                <div>
                  <span className="text-xs font-semibold text-stone-600 block mb-1">
                    Suitable Seasons
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.season?.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 bg-[#EBF3EE] text-[#1E392A] text-[11px] font-medium rounded-lg"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {item.occasion?.length > 0 && (
                  <div>
                    <span className="text-xs font-semibold text-stone-600 block mb-1">
                      Occasions
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.occasion.map((occ) => (
                        <span
                          key={occ}
                          className="px-2.5 py-1 bg-stone-100 text-stone-700 text-[11px] font-medium rounded-lg"
                        >
                          {occ}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Notes */}
              {item.notes && (
                <div className="p-3 bg-stone-50 border border-stone-200/80 rounded-xl">
                  <span className="text-[11px] font-semibold text-stone-500 block mb-0.5">Notes</span>
                  <p className="text-xs text-stone-700 leading-relaxed italic">{item.notes}</p>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="space-y-2 pt-2 border-t border-[#E8E2D8]">
              <button
                type="button"
                onClick={() => onRecordWorn(item)}
                className="w-full py-2.5 px-4 bg-[#1E392A] hover:bg-[#15291E] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-[#C2A674]" />
                <span>Mark as Worn Today</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onEdit(item);
                  }}
                  className="flex-1 py-2 px-3 border border-stone-300 hover:border-stone-400 bg-white text-stone-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Item</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="py-2 px-3 border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        title="Delete Clothing Item"
        message={`Are you sure you want to permanently delete "${item.name}" from your wardrobe? It will also be removed from any outfits containing it.`}
        confirmLabel="Delete Item"
        isDestructive={true}
        onConfirm={() => {
          setShowDeleteConfirm(false);
          onDelete(item);
          onClose();
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
};
