import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ToolsList from './tools/ToolsList';
import ImageGeneration from './tools/ImageGeneration';
import ChatBot from './tools/ChatBot';
import TextAnalysis from './tools/TextAnalysis';

export default function Tools() {
  return (
    <Routes>
      <Route index element={<ToolsList />} />
      <Route path="image-generation" element={<ImageGeneration />} />
      <Route path="chatbot" element={<ChatBot />} />
      <Route path="text-analysis" element={<TextAnalysis />} />
    </Routes>
  );
}