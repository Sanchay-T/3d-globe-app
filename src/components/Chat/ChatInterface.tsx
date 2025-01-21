import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
`;

const ChatHeader = styled.div`
  padding: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 0.9rem;
  color: white;
  font-weight: 600;
  background: linear-gradient(135deg, #fff 0%, #ddd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ChatMessages = styled.div`
  padding: 0.75rem;
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`;

const Message = styled.div<{ isUser: boolean }>`
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  max-width: 85%;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  background: ${props => props.isUser ? 
    'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)' : 
    'rgba(255, 255, 255, 0.1)'};
  color: white;
  font-size: 0.8rem;
  line-height: 1.4;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -4px;
    ${props => props.isUser ? 'right' : 'left'}: 8px;
    width: 16px;
    height: 8px;
    background: inherit;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    transform: ${props => props.isUser ? 'scaleX(-1)' : 'none'};
  }
`;

const InputContainer = styled.div`
  padding: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.6rem;
  color: white;
  font-size: 0.8rem;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
  border: none;
  border-radius: 6px;
  padding: 0 1rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(255, 75, 75, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface Message {
  text: string;
  isUser: boolean;
  timestamp: number;
}

interface ChatInterfaceProps {
  onAppSearch: (appName: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onAppSearch }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Enter an app name to see its global restrictions and regulations.",
      isUser: false,
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    onAppSearch(input);

    const botMessage: Message = {
      text: `Searching for global restrictions and regulations for ${input}...`,
      isUser: false,
      timestamp: Date.now() + 1
    };

    setMessages(prev => [...prev, botMessage]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>Global App Restrictions Assistant</ChatTitle>
      </ChatHeader>
      <ChatMessages>
        {messages.map((message, index) => (
          <Message key={message.timestamp} isUser={message.isUser}>
            {message.text}
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </ChatMessages>
      <InputContainer>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter an app name..."
        />
        <SendButton onClick={handleSend}>Send</SendButton>
      </InputContainer>
    </ChatContainer>
  );
};