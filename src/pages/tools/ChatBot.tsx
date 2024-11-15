import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ImageTextInput() {
  const [image, setImage] = useState<File | null>(null);
  const [normalPrompt, setNormalPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<string | null>(null); // Store only the latest conversation

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setConversation(null); // Clear the previous conversation when a new image is uploaded
    }
  };

  const handleRemoveImage = () => {
    setImage(null); // Clear the image
  };

  const getSystemMessage = (prompt: string) => {
    if (/mcq|multiple choice/i.test(prompt)) {
      return 'You are ChatGPT, an intelligent assistant that provides clear, structured answers to multiple-choice questions with reasoning and options listed.';
    }
    return 'You are ChatGPT, an intelligent conversational AI. Respond in a detailed, friendly, and structured format with bullet points, numbered lists, and emphasis where needed.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let conversationText = `Q: ${normalPrompt}\n\nA: `; // Start conversation with question
    try {
      let promptToSend = normalPrompt;

      // If an image is uploaded, perform OCR and combine extracted text with the prompt
      if (image) {
        const { data: { text } } = await Tesseract.recognize(image, 'eng');
        if (text.trim()) {
          promptToSend = `${normalPrompt}\n\nThe following text was extracted from the image:\n\n${text}`;
          toast.success('Text extracted from image successfully! Now processing with your instruction...');
        } else {
          toast.error('No text found in the image.');
          setLoading(false);
          return;
        }
      }

      const systemMessage = getSystemMessage(promptToSend);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: promptToSend },
          ],
          stream: true, // Enable streaming in the API request
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let responseContent = ''; // Accumulate content for a single response

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter(line => line.trim() !== '');
          for (const line of lines) {
            if (line === 'data: [DONE]') {
              // Ignore [DONE] signal
              continue;
            }
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                const content = data.choices?.[0]?.delta?.content;
                if (content) {
                  responseContent += content;
                }
              } catch (parseError) {
                console.error('Failed to parse JSON:', parseError);
              }
            }
          }
        }
        // Finalize the response for the current question
        conversationText += responseContent;
        setConversation(conversationText); // Display only the current question and answer
      }

    } catch (error) {
      console.error('Failed to process input:', error);
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">AI Assistant</h1>
        <p className="mt-2 text-slate-600">Upload an image and/or enter a prompt to interact with the AI assistant.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-slate-700">
              Upload Image (Optional)
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-slate-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-indigo-50 file:text-indigo-700
                         hover:file:bg-indigo-100"
            />
            {image && (
              <div className="mt-2 relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="h-48 w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600 focus:outline-none"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="normalPrompt" className="block text-sm font-medium text-slate-700">
              Enter a Prompt
            </label>
            <textarea
              id="normalPrompt"
              rows={3}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Type your prompt here..."
              value={normalPrompt}
              onChange={(e) => setNormalPrompt(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Processing...
                </>
              ) : (
                'Submit Prompt'
              )}
            </button>
          </form>
        </div>

        {conversation && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Response</h3>
            <div className="bg-slate-100 rounded-lg p-4">
              <p className="text-sm text-slate-900" style={{ whiteSpace: 'pre-line' }}>{conversation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
