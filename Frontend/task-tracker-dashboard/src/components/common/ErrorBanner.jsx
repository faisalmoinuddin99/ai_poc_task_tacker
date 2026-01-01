import { AlertCircle } from '../icons/AlertCircle';

export const ErrorBanner = ({ error, onRetry }) => (
  <div className="bg-red-900 bg-opacity-50 border border-red-500 rounded-2xl p-4 mb-6 flex items-center justify-between">
    <div className="flex items-center">
      <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
      <div>
        <p className="text-sm font-semibold">Failed to load data</p>
        <p className="text-xs text-red-200">{error}</p>
      </div>
    </div>
    <button onClick={onRetry} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold">
      Retry
    </button>
  </div>
);