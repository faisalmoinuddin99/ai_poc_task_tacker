export const LoadingSpinner = ({ size = "md" }) => {
  const sizeClass = size === "sm" ? "w-8 h-8" : "w-16 h-16";
  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClass} border-4 border-orange-500 border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};