import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Image, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ImageGeneration() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { user } = useAuth();

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    try {
      // Make API call to OpenAI's DALL-E model
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1024x1024',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      const imageUrl = data.data[0].url;

      setResult(imageUrl);
      toast.success('Image generated successfully!');
    } catch (error) {
      toast.error('Failed to generate image');
      console.error('Image generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">AI Image Generation</h1>
        <p className="mt-2 text-slate-600">Create unique images from text descriptions using AI.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <form onSubmit={generateImage} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-slate-700">
              Describe your image
            </label>
            <textarea
              id="prompt"
              rows={3}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="A serene landscape with mountains at sunset..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Generating...
              </>
            ) : (
              <>
                <Image className="-ml-1 mr-2 h-4 w-4" />
                Generate Image
              </>
            )}
          </button>
        </form>

        {result && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Generated Image</h3>
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <img
                src={result}
                alt="Generated"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => window.open(result, '_blank')}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Open full size
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
