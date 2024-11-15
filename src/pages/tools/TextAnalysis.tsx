import React, { useState } from 'react';
import { Mic, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CourseAdvisor() {
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState('');
  const [speaking, setSpeaking] = useState(false); // Track if speaking

  // Set up Speech Recognition
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Speech Recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('User said:', transcript);
      setListening(false);
      await handleUserInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      toast.error('Could not recognize speech. Please try again.');
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognition.start();
  };

  // Handle user input and interact with OpenAI API
  const handleUserInput = async (question) => {
    setLoading(true);
    setResponse(''); // Clear previous response

    try {
      const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: question }],
          max_tokens: 150,
        }),
      });

      if (!openAiResponse.ok) {
        const errorText = await openAiResponse.text();
        console.error('OpenAI API error:', errorText);
        throw new Error(`OpenAI API response not OK: ${openAiResponse.status}`);
      }

      const responseData = await openAiResponse.json();
      const botResponse = responseData.choices[0].message.content.trim();
      setResponse(botResponse);

      // Speak the response using the Web Speech API
      speakResponse(botResponse);

    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
      toast.error('Failed to get response from OpenAI.');
    } finally {
      setLoading(false);
    }
  };

  // Speak the response
  const speakResponse = (text) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      toast.error('Speech synthesis not supported in this browser.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1; // Adjust speed here if needed

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);

    synth.speak(utterance);
  };

  // Stop speaking
  const stopSpeaking = () => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel(); // Stop the current speech
      setSpeaking(false); // Update speaking state
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-blue-900 text-white">
      <h1 className="text-3xl font-bold mb-4">NeuralHub</h1>
      <p className="mb-8">Ask questions, and the AI will respond!</p>

      <div className="bg-blue-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Mic className="mr-2 h-5 w-5" />
          Voice Assistant
        </h2>
        <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center text-black">
          {loading ? (
            <Loader className="animate-spin h-8 w-8" />
          ) : (
            <button
              onClick={startListening}
              className="text-blue-600 font-bold"
              disabled={listening}
            >
              {listening ? 'Listening...' : 'Start Listening'}
            </button>
          )}
          {speaking && (
            <button
              onClick={stopSpeaking}
              className="text-red-600 font-bold mt-4"
            >
              Stop
            </button>
          )}
          {response && (
            <div className="mt-4">
              <p className="text-center text-sm">{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
