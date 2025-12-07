
import React from 'react';

interface CropSelectorProps {
  crops: string[];
  selectedCrop: string | null;
  onSelectCrop: (crop: string) => void;
}

const CropSelector: React.FC<CropSelectorProps> = ({ crops, selectedCrop, onSelectCrop }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md sticky top-20">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Culturas</h2>
      <div className="space-y-2">
        {crops.map((crop) => (
          <button
            key={crop}
            onClick={() => onSelectCrop(crop)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              selectedCrop === crop
                ? 'bg-green-600 text-white shadow'
                : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-800'
            }`}
          >
            {crop}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CropSelector;
