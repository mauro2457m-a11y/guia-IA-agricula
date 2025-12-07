
import React, { useState, useCallback } from 'react';
import { CULTURAS } from './constants';
import type { CropData } from './types';
import { fetchCropData } from './services/geminiService';
import CropSelector from './components/CropSelector';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [cropData, setCropData] = useState<CropData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectCrop = useCallback(async (crop: string) => {
    setSelectedCrop(crop);
    setIsLoading(true);
    setError(null);
    setCropData(null);
    try {
      const data = await fetchCropData(crop);
      setCropData(data);
    } catch (err) {
      console.error(err);
      setError('Falha ao buscar dados. A IA pode estar sobrecarregada. Por favor, tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-green-50/50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-700 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.713 3.332c-0.307-0.307-0.72-0.462-1.135-0.462h-1.156c-0.413 0-0.826 0.155-1.133 0.462l-3.287 3.287c-0.103 0.103-0.184 0.222-0.24 0.352-0.103 0.239-0.103 0.505 0 0.744s0.276 0.446 0.515 0.549c0.13 0.056 0.249 0.137 0.352 0.24l3.287 3.287c0.307 0.307 0.72 0.462 1.133 0.462h1.156c0.415 0 0.828-0.155 1.135-0.462l0.87-0.87c0.307-0.307 0.462-0.72 0.462-1.135v-3.44c0-0.415-0.155-0.828-0.462-1.135l-0.87-0.87zM17 9.42v1.16c0 0.223-0.082 0.426-0.231 0.575l-0.87 0.87c-0.149 0.149-0.352 0.231-0.575 0.231h-1.156c-0.222 0-0.425-0.082-0.574-0.231l-3.287-3.287-0.707 0.707 3.287 3.287c0.307 0.307 0.72 0.462 1.133 0.462h1.156c0.415 0 0.828-0.155 1.135-0.462l0.87-0.87c0.307-0.307 0.462-0.72 0.462-1.135v-1.16h-1.44z" />
                <path d="M4.242 10.515c-0.456-0.456-1.111-0.627-1.666-0.472l-1.41-1.41c-0.188-0.188-0.442-0.293-0.707-0.293h-0.03c-0.552 0-1 0.448-1 1v0.03c0 0.265 0.105 0.519 0.293 0.707l1.41 1.41c-0.155 0.555 0.016 1.21 0.472 1.666l3.287 3.287c0.456 0.456 1.111 0.627 1.666 0.472l1.41 1.41c0.188 0.188 0.442 0.293 0.707 0.293h0.03c0.552 0 1-0.448 1-1v-0.03c0-0.265-0.105-0.519-0.293-0.707l-1.41-1.41c0.155-0.555-0.016-1.21-0.472-1.666l-3.287-3.287z" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Guia do Agrônomo<span className="text-green-600">.AI</span></h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <aside className="md:w-1/4 lg:w-1/5 mb-8 md:mb-0">
             <CropSelector
              crops={CULTURAS}
              selectedCrop={selectedCrop}
              onSelectCrop={handleSelectCrop}
            />
          </aside>
          <div className="flex-1">
             <ResultDisplay
                cropData={cropData}
                isLoading={isLoading}
                error={error}
                selectedCrop={selectedCrop}
              />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
