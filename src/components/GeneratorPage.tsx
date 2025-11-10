import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Sparkles, Upload, X } from 'lucide-react';
import { ProductData } from '../App';
import { Progress } from './ui/progress';

interface GeneratorPageProps {
  onGenerate: (data: ProductData) => void;
  initialData: ProductData;
  onNavigate: (page: 'home' | 'generator' | 'result') => void;
}

export function GeneratorPage({ onGenerate, initialData, onNavigate }: GeneratorPageProps) {
  const [productName, setProductName] = useState(initialData.productName);
  const [productDetails, setProductDetails] = useState(initialData.productDetails);
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(initialData.uploadedImage);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleGenerate = () => {
    if (!productName.trim()) {
      alert('Please enter a product name');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 400);

    // Simulate AI processing
    setTimeout(() => {
      clearInterval(interval);
      onGenerate({
        productName,
        productDetails,
        uploadedImage,
      });
      setIsGenerating(false);
      setProgress(0);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-[#4A90E2] p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl text-[#333]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                RuralMarket.AI
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => onNavigate('home')}
                className="text-[#333] hover:text-[#4A90E2] transition-colors"
              >
                Home
              </button>
              <button className="text-[#333] hover:text-[#4A90E2] transition-colors">About</button>
              <button 
                onClick={() => onNavigate('generator')}
                className="text-[#4A90E2]"
              >
                Generate
              </button>
              <button className="text-[#333] hover:text-[#4A90E2] transition-colors">Contact</button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl text-[#333] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            AI Product Listing Generator
          </h1>
        </div>

        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-2xl text-[#333] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Enter Your Product Details
          </h2>
          <div className="h-1 w-20 bg-[#4A90E2] rounded-full" />
        </div>

        <div className="space-y-8">
          {/* Upload Box */}
          <Card className="p-6 rounded-2xl shadow-md border-2 border-gray-100">
            <label className="block text-[#333] mb-4">
              Upload Product Photo (Optional)
            </label>
            
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-[#4A90E2] bg-[#D8EEFF]/30'
                  : 'border-gray-300 hover:border-[#4A90E2] hover:bg-gray-50'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploadedImage ? (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded product"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedImage(undefined);
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 text-[#333]" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="w-12 h-12 text-[#4A90E2] mx-auto" />
                  <p className="text-[#333]">
                    Drag and drop your product photo here
                  </p>
                  <p className="text-sm text-gray-500">or click to browse</p>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </Card>

          {/* Input Fields */}
          <Card className="p-8 rounded-2xl shadow-md border-2 border-gray-100 space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <label htmlFor="productName" className="flex items-center gap-2 text-[#333]">
                <span>📝</span>
                <span>Product Name</span>
              </label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g., Fresh Organic Tomatoes"
                className="rounded-xl border-2 border-gray-200 focus:border-[#4A90E2] px-4 py-3"
                disabled={isGenerating}
              />
            </div>

            {/* Product Details */}
            <div className="space-y-2">
              <label htmlFor="productDetails" className="flex items-center gap-2 text-[#333]">
                <span>📝</span>
                <span>Product Description / Features</span>
              </label>
              <Textarea
                id="productDetails"
                value={productDetails}
                onChange={(e) => setProductDetails(e.target.value)}
                placeholder="Describe your product..."
                rows={5}
                className="rounded-xl border-2 border-gray-200 focus:border-[#4A90E2] px-4 py-3 resize-none"
                disabled={isGenerating}
              />
              <p className="text-sm text-gray-500 italic">
                Add short details about your product (e.g., handmade, organic, new).
              </p>
            </div>
          </Card>

          {/* Generate Button */}
          <div className="text-center pt-4">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !productName.trim()}
              className="bg-[#4A90E2] hover:bg-[#357ABD] text-white px-16 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {isGenerating ? 'Generating...' : 'Generate Listing'}
            </Button>
          </div>

          {/* Progress Bar */}
          {isGenerating && (
            <Card className="p-6 rounded-2xl bg-[#D8EEFF]/30 border-2 border-[#4A90E2]/20">
              <div className="space-y-4">
                <p className="text-center text-[#333]">
                  ✨ Generating your listing...
                </p>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-center text-gray-600">
                  {progress < 40 && 'Analyzing product details...'}
                  {progress >= 40 && progress < 70 && 'Creating description...'}
                  {progress >= 70 && progress < 100 && 'Optimizing content...'}
                  {progress >= 100 && 'Almost done!'}
                </p>
              </div>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">
            © 2025 RuralMarket.AI – Empowering Rural Entrepreneurs with AI
          </p>
        </div>
      </footer>
    </div>
  );
}
