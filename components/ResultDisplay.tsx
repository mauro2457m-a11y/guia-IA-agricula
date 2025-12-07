
import React from 'react';
import type { CropData } from '../types';
import Spinner from './Spinner';
import BugIcon from './icons/BugIcon';
import PotionIcon from './icons/PotionIcon';
import SproutIcon from './icons/SproutIcon';

interface ResultDisplayProps {
  cropData: CropData | null;
  isLoading: boolean;
  error: string | null;
  selectedCrop: string | null;
}

const WelcomeMessage: React.FC = () => (
  <div className="text-center p-8 bg-white rounded-xl shadow-md">
    <SproutIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Bem-vindo ao Guia do Agrônomo.AI</h2>
    <p className="text-gray-600">Selecione uma cultura no menu ao lado para começar.</p>
    <p className="text-xs text-gray-400 mt-6">A informação é gerada por IA e deve ser verificada por um profissional qualificado.</p>
  </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center p-8 bg-red-50 border border-red-200 rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-red-800">Ocorreu um Erro</h3>
        <p className="text-red-600 mt-2">{message}</p>
    </div>
);

const DataCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-md mb-6">
    <div className="flex items-center mb-4 border-b pb-3">
      {icon}
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ cropData, isLoading, error, selectedCrop }) => {
  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Spinner /></div>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!cropData) {
    return <WelcomeMessage />;
  }
  
  return (
    <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Informações para <span className="text-green-700">{selectedCrop}</span></h2>
        
        <DataCard title="Pragas Comuns" icon={<BugIcon className="w-7 h-7 text-green-700 mr-3" />}>
            {cropData.pests.map((pest, index) => (
                <div key={index} className="border-b last:border-0 pb-2">
                    <h4 className="font-bold text-gray-700">{pest.name}</h4>
                    <p className="text-sm text-gray-600 mt-1"><span className="font-semibold">Descrição:</span> {pest.description}</p>
                    <p className="text-sm text-gray-600 mt-1"><span className="font-semibold">Controle:</span> {pest.control}</p>
                </div>
            ))}
        </DataCard>

        <DataCard title="Venenos / Pesticidas" icon={<PotionIcon className="w-7 h-7 text-green-700 mr-3" />}>
            {cropData.pesticides.map((pesticide, index) => (
                <div key={index} className="border-b last:border-0 pb-2">
                    <h4 className="font-bold text-gray-700">{pesticide.name}</h4>
                    <p className="text-sm text-gray-600 mt-1"><span className="font-semibold">Princípio Ativo:</span> {pesticide.active_ingredient}</p>
                    <p className="text-sm text-gray-600 mt-1"><span className="font-semibold">Recomendação:</span> {pesticide.recommendation}</p>
                </div>
            ))}
        </DataCard>

        <DataCard title="Produtos Agrícolas" icon={<SproutIcon className="w-7 h-7 text-green-700 mr-3" />}>
            {cropData.products.map((product, index) => (
                <div key={index} className="border-b last:border-0 pb-2">
                    <h4 className="font-bold text-gray-700">{product.name}</h4>
                    <p className="text-sm text-gray-600 mt-1"><span className="font-semibold">Tipo:</span> {product.type}</p>
                    <p className="text-sm text-gray-600 mt-1"><span className="font-semibold">Uso:</span> {product.usage}</p>
                </div>
            ))}
        </DataCard>
    </div>
  );
};

export default ResultDisplay;
