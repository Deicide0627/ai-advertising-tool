import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { GeneratorPage } from './components/GeneratorPage';
import { ResultPage } from './components/ResultPage';

export interface ProductData {
  productName: string;
  productDetails: string;
  uploadedImage?: string;
}

export interface GeneratedListing {
  title: string;
  description: string;
  hashtags: string[];
  price: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'generator' | 'result'>('home');
  const [productData, setProductData] = useState<ProductData>({
    productName: '',
    productDetails: '',
  });
  const [generatedListing, setGeneratedListing] = useState<GeneratedListing | null>(null);

  const handleNavigate = (page: 'home' | 'generator' | 'result') => {
    setCurrentPage(page);
  };

  const handleGenerateListing = (data: ProductData) => {
    setProductData(data);
    
    // Simulate AI generation
    const generated: GeneratedListing = {
      title: generateTitle(data.productName, data.productDetails),
      description: generateDescription(data.productName, data.productDetails),
      hashtags: generateHashtags(data.productName, data.productDetails),
      price: generatePrice(data.productName, data.productDetails),
    };
    
    setGeneratedListing(generated);
    setCurrentPage('result');
  };

  const handleGenerateAgain = () => {
    setCurrentPage('generator');
    setGeneratedListing(null);
  };

  // AI Generation Logic (mock)
  const generateTitle = (name: string, details: string): string => {
    if (!name) return 'Premium Quality Product - Fresh & Natural';
    
    const keywords = details.toLowerCase();
    const adjectives = [];
    
    if (keywords.includes('fresh') || keywords.includes('organic')) adjectives.push('Fresh');
    if (keywords.includes('handmade') || keywords.includes('craft')) adjectives.push('Handcrafted');
    if (keywords.includes('natural') || keywords.includes('pure')) adjectives.push('Natural');
    if (keywords.includes('premium') || keywords.includes('quality')) adjectives.push('Premium');
    
    if (adjectives.length === 0) adjectives.push('Quality');
    
    return `${adjectives.join(' ')} ${name} - Locally Sourced`;
  };

  const generateDescription = (name: string, details: string): string => {
    const baseDesc = details || 'High-quality product carefully selected for you';
    
    return `Discover our ${name.toLowerCase() || 'product'} - perfect for those who value quality and authenticity.

${baseDesc}

✅ What makes it special:
• Sourced directly from local producers
• Quality guaranteed - inspected and certified
• Fresh and natural ingredients/materials
• Support rural communities with every purchase

🚚 Delivery Information:
Fast and reliable delivery available to your area. We handle each order with care to ensure you receive your ${name.toLowerCase() || 'product'} in perfect condition.

💚 Why Choose Us:
We're committed to connecting rural sellers with customers who appreciate genuine, quality products. Every purchase supports local farmers and artisans.

Order now and experience the difference of authentic, locally-sourced products!`;
  };

  const generateHashtags = (name: string, details: string): string[] => {
    const hashtags = ['#handmade', '#localproduct'];
    
    const keywords = (name + ' ' + details).toLowerCase();
    
    if (keywords.includes('organic') || keywords.includes('natural')) {
      hashtags.push('#organic', '#natural');
    }
    if (keywords.includes('handmade') || keywords.includes('craft')) {
      hashtags.push('#artisan', '#crafted');
    }
    if (keywords.includes('fresh') || keywords.includes('farm')) {
      hashtags.push('#fresh', '#farmtotable');
    }
    if (keywords.includes('sarawak') || keywords.includes('sabah') || keywords.includes('malaysia')) {
      hashtags.push('#sarawak', '#malaysia');
    }
    
    hashtags.push('#ruralmarket', '#supportlocal');
    
    return hashtags.slice(0, 8);
  };

  const generatePrice = (name: string, details: string): string => {
    // Simple price estimation based on keywords
    const keywords = (name + ' ' + details).toLowerCase();
    
    let basePrice = 25;
    
    if (keywords.includes('premium') || keywords.includes('quality')) basePrice += 15;
    if (keywords.includes('organic') || keywords.includes('natural')) basePrice += 10;
    if (keywords.includes('handmade') || keywords.includes('craft')) basePrice += 20;
    if (keywords.includes('large') || keywords.includes('big')) basePrice += 10;
    if (keywords.includes('kg') || keywords.includes('kilogram')) basePrice = 15;
    
    const randomVariation = Math.floor(Math.random() * 10);
    const finalPrice = basePrice + randomVariation;
    
    return `RM ${finalPrice}.00`;
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'generator' && (
        <GeneratorPage
          onGenerate={handleGenerateListing}
          initialData={productData}
          onNavigate={handleNavigate}
        />
      )}
      {currentPage === 'result' && generatedListing && (
        <ResultPage
          listing={generatedListing}
          productImage={productData.uploadedImage}
          onGenerateAgain={handleGenerateAgain}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
