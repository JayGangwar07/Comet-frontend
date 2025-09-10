export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="text-center">
        <img 
          src="src/assets/dev.gif"
          alt="Construction Worker" 
          className="mx-auto mb-4 w-64 h-64 object-contain"
        />
        <h1 className="text-2xl font-bold text-white">
          Under Development Since 1947
        </h1>
      </div>
    </div>
  );
}