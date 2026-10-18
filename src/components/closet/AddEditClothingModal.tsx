import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Camera,
  Plus,
  Image as ImageIcon,
  Check,
  AlertCircle,
} from 'lucide-react';
import {
  ClothingItem,
  STANDARD_CATEGORIES,
  ALL_SEASONS,
  Season,
  ItemStatus,
  COLOR_PALETTE,
  POPULAR_OCCASIONS,
} from '../../types/closet.js';
import { closetService } from '../../services/closetService.js';
import { showToast } from '../common/Toast.js';

interface AddEditClothingModalProps {
  isOpen: boolean;
  itemToEdit?: ClothingItem | null;
  userId: string;
  onClose: () => void;
  onSaved: (item: ClothingItem) => void;
}

export const AddEditClothingModal: React.FC<AddEditClothingModalProps> = ({
  isOpen,
  itemToEdit,
  userId,
  onClose,
  onSaved,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('T-shirts and shirts');
  const [customCatInput, setCustomCatInput] = useState('');
  const [showCustomCatField, setShowCustomCatField] = useState(false);
  const [allCategories, setAllCategories] = useState<string[]>([...STANDARD_CATEGORIES]);

  const [color, setColor] = useState('White');
  const [customColor, setCustomColor] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [seasons, setSeasons] = useState<Season[]>(['All-Season']);
  const [occasions, setOccasions] = useState<string[]>(['Casual Outings']);
  const [status, setStatus] = useState<ItemStatus>('clean');
  const [notes, setNotes] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load categories and edit data on open
  useEffect(() => {
    if (!isOpen) return;

    closetService.getCategories(userId).then(setAllCategories);

    if (itemToEdit) {
      setName(itemToEdit.name);
      setCategory(itemToEdit.category);
      setColor(itemToEdit.color);
      setBrand(itemToEdit.brand || '');
      setSize(itemToEdit.size || '');
      setSeasons(itemToEdit.season || ['All-Season']);
      setOccasions(itemToEdit.occasion || []);
      setStatus(itemToEdit.status || 'clean');
      setNotes(itemToEdit.notes || '');
      setImageUrl(itemToEdit.image_url || '');
    } else {
      setName('');
      setCategory('T-shirts and shirts');
      setColor('White');
      setBrand('');
      setSize('');
      setSeasons(['All-Season']);
      setOccasions(['Casual Outings']);
      setStatus('clean');
      setNotes('');
      setImageUrl('');
      setImageFile(null);
    }
    setError(null);
  }, [isOpen, itemToEdit, userId]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (JPEG, PNG, WEBP).');
        return;
      }
      setImageFile(file);
      const tempUrl = URL.createObjectURL(file);
      setImageUrl(tempUrl);
      setError(null);
    }
  };

  const handleAddCustomCategory = async () => {
    if (!customCatInput.trim()) return;
    const updated = await closetService.addCustomCategory(userId, customCatInput.trim());
    setAllCategories(updated);
    setCategory(customCatInput.trim());
    setCustomCatInput('');
    setShowCustomCatField(false);
    showToast('success', 'Custom Category Added', `Added "${customCatInput.trim()}"`);
  };

  const toggleSeason = (season: Season) => {
    if (season === 'All-Season') {
      setSeasons(['All-Season']);
      return;
    }
    const filtered = seasons.filter((s) => s !== 'All-Season');
    if (filtered.includes(season)) {
      const next = filtered.filter((s) => s !== season);
      setSeasons(next.length === 0 ? ['All-Season'] : next);
    } else {
      setSeasons([...filtered, season]);
    }
  };

  const toggleOccasion = (occ: string) => {
    if (occasions.includes(occ)) {
      setOccasions(occasions.filter((o) => o !== occ));
    } else {
      setOccasions([...occasions, occ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide a name for this clothing item.');
      return;
    }

    if (!imageUrl && !imageFile) {
      setError('Please upload a clothing photo or select an image.');
      return;
    }

    setLoading(true);

    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        finalImageUrl = await closetService.uploadPhoto(userId, imageFile);
      }

      const chosenColor = customColor.trim() || color;

      if (itemToEdit) {
        const updated = await closetService.updateItem(itemToEdit.id, {
          name: name.trim(),
          category,
          color: chosenColor,
          brand: brand.trim(),
          size: size.trim(),
          season: seasons,
          occasion: occasions,
          status,
          notes: notes.trim(),
          image_url: finalImageUrl,
        });
        if (updated) {
          showToast('success', 'Item Updated', `Changes to "${updated.name}" saved.`);
          onSaved(updated);
          onClose();
        }
      } else {
        const created = await closetService.createItem({
          user_id: userId,
          name: name.trim(),
          category,
          color: chosenColor,
          brand: brand.trim(),
          size: size.trim(),
          season: seasons,
          occasion: occasions,
          status,
          notes: notes.trim(),
          image_url: finalImageUrl,
          is_favorite: false,
          times_worn: 0,
        });
        showToast('success', 'Clothing Added', `"${created.name}" added to your closet.`);
        onSaved(created);
        onClose();
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save clothing item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FAF7F2] border border-[#E8E2D8] rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/50 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h2 className="font-editorial text-2xl font-bold text-[#1C1917]">
            {itemToEdit ? 'Edit Clothing Item' : 'Add to Your Closet'}
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Capture or upload your actual garment to build your digital archive.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Photo Upload Area */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              Garment Photography *
            </label>

            {imageUrl ? (
              <div className="relative w-full aspect-16/9 sm:aspect-2/1 rounded-2xl overflow-hidden bg-stone-100 border border-[#E8E2D8] group">
                <img
                  src={imageUrl}
                  alt="Garment preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white text-stone-900 rounded-xl text-xs font-semibold shadow-sm cursor-pointer hover:bg-stone-100"
                  >
                    Change Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageUrl('');
                      setImageFile(null);
                    }}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-semibold shadow-sm cursor-pointer hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-[#D7D0C5] hover:border-[#1E392A] rounded-2xl p-6 text-center transition-colors bg-white/60">
                <div className="w-12 h-12 rounded-2xl bg-[#EBF3EE] text-[#1E392A] flex items-center justify-center mx-auto mb-3">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold text-stone-800">
                  Upload a photo of your clothing piece
                </p>
                <p className="text-[11px] text-stone-500 mt-1">
                  Supports JPEG, PNG, WEBP from your phone or desktop
                </p>

                <div className="flex items-center justify-center gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#E8E2D8] hover:border-stone-400 rounded-xl text-xs font-semibold text-stone-700 cursor-pointer shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Select Photo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#1E392A] hover:bg-[#15291E] text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Take Photo</span>
                  </button>
                </div>
              </div>
            )}

            {/* Hidden native inputs for file & camera capture */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Clothing Name */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Item Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ivory Silk Camp Collar Shirt"
              className="w-full px-4 py-2.5 bg-white border border-[#E8E2D8] rounded-xl text-sm focus:outline-none focus:border-[#1E392A]"
            />
          </div>

          {/* Category & Custom Category */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-stone-700">
                Wardrobe Category *
              </label>
              <button
                type="button"
                onClick={() => setShowCustomCatField(!showCustomCatField)}
                className="text-[11px] font-semibold text-[#1E392A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Custom Category</span>
              </button>
            </div>

            {showCustomCatField && (
              <div className="flex items-center gap-2 mb-2 p-2 bg-stone-100 rounded-xl">
                <input
                  type="text"
                  value={customCatInput}
                  onChange={(e) => setCustomCatInput(e.target.value)}
                  placeholder="e.g. Loungewear or Hats"
                  className="flex-1 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddCustomCategory}
                  className="px-3 py-1.5 bg-[#1E392A] text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Add
                </button>
              </div>
            )}

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-[#E8E2D8] rounded-xl text-xs font-medium text-stone-800"
            >
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Color Selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Primary Color *
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {COLOR_PALETTE.map((c) => {
                const isSelected = color === c.name && !customColor;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      setColor(c.name);
                      setCustomColor('');
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                        : 'bg-white text-stone-700 border-[#E8E2D8] hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-stone-300 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name.split('/')[0]}</span>
                  </button>
                );
              })}
            </div>
            <input
              type="text"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              placeholder="Or enter custom color (e.g. Sage, Ochre, Terracotta)"
              className="w-full px-3 py-2 bg-white border border-[#E8E2D8] rounded-xl text-xs"
            />
          </div>

          {/* Brand & Size */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Brand / Designer
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Arket, Loro Piana"
                className="w-full px-3 py-2.5 bg-white border border-[#E8E2D8] rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Size
              </label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="e.g. M, 32, 42 EU"
                className="w-full px-3 py-2.5 bg-white border border-[#E8E2D8] rounded-xl text-xs"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Current Cleanliness / Availability Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['clean', 'in_laundry', 'unavailable'] as ItemStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatus(st)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize cursor-pointer text-center transition-all ${
                    status === st
                      ? 'bg-[#1E392A] text-white border-[#1E392A] shadow-xs'
                      : 'bg-white text-stone-600 border-[#E8E2D8] hover:border-stone-400'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Suitable Seasons */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Seasons
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_SEASONS.map((s) => {
                const isSelected = seasons.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSeason(s)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#1E392A] text-white border-[#1E392A]'
                        : 'bg-white text-stone-600 border-[#E8E2D8]'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Occasions */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Suitable Occasions
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_OCCASIONS.map((occ) => {
                const isSelected = occasions.includes(occ);
                return (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => toggleOccasion(occ)}
                    className={`px-3 py-1 rounded-xl border text-[11px] font-medium cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#1E392A] text-white border-[#1E392A]'
                        : 'bg-white text-stone-600 border-[#E8E2D8]'
                    }`}
                  >
                    {occ}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Styling Notes / Fabric Details (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Pure Irish linen, dry clean only, best paired with relaxed denim"
              className="w-full px-3 py-2 bg-white border border-[#E8E2D8] rounded-xl text-xs focus:outline-none focus:border-[#1E392A]"
            />
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E2D8]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-[#1E392A] hover:bg-[#15291E] disabled:opacity-60 text-white text-xs font-semibold cursor-pointer shadow-sm transition-all"
            >
              {loading ? 'Saving to Closet...' : itemToEdit ? 'Save Changes' : 'Add to Closet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
