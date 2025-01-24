import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  overflow: hidden;
  position: relative;
  transform: translate3d(0,0,0);
  will-change: transform;
`;

const ChatHeader = styled.div`
  padding: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
  background: inherit;
  position: sticky;
  top: 0;
  z-index: 2;
  height: 48px;
  box-sizing: border-box;
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

const MessagesContainer = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  height: calc(100% - 112px); /* 48px header + 64px input */
  min-height: 0;
`;

const ChatMessages = styled.div`
  height: 100%;
  padding: 0.75rem;
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

const Message = styled.div<{ isUser: boolean; isError?: boolean }>`
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  max-width: 85%;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  background: ${props => {
    if (props.isError) return 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)';
    return props.isUser ? 
      'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)' : 
      'rgba(255, 255, 255, 0.1)';
  }};
  color: white;
  font-size: 0.8rem;
  line-height: 1.4;
  position: relative;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

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
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  height: 64px;
  box-sizing: border-box;
`;

const Input = styled.input`
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.6rem;
  color: white;
  font-size: 0.8rem;
  margin: 0;
  -webkit-appearance: none;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SendButton = styled.button<{ disabled?: boolean }>`
  background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
  border: none;
  border-radius: 6px;
  padding: 0 1rem;
  color: white;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  font-size: 0.8rem;
  opacity: ${props => props.disabled ? 0.5 : 1};
  margin: 0;
  -webkit-appearance: none;

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 2px 8px rgba(255, 75, 75, 0.4)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

interface Message {
  text: string;
  isUser: boolean;
  timestamp: number;
  isError?: boolean;
}

export const ChatInterface: React.FC = () => {
  const { setAppData, isLoading, error } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Enter an app name to see its global restrictions and regulations.",
      isUser: false,
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const logDimensions = (event: string) => {
    if (messagesRef.current) {
      console.log(`[${event}] Messages Dimensions:`, {
        height: messagesRef.current.offsetHeight,
        scrollHeight: messagesRef.current.scrollHeight,
        scrollTop: messagesRef.current.scrollTop,
        clientHeight: messagesRef.current.clientHeight
      });
    }
  };

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
    logDimensions('After Scroll');
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isLoading) {
      setMessages(prev => [...prev, {
        text: "Searching for restrictions and regulations...",
        isUser: false,
        timestamp: Date.now()
      }]);
    } else if (error) {
      setMessages(prev => [...prev, {
        text: `Error: ${error}`,
        isUser: false,
        timestamp: Date.now(),
        isError: true
      }]);
    }
  }, [isLoading, error]);

  const handleSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    logDimensions('Before Submit');
    
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    const appName = input.trim();
    setInput('');
    
    try {
      await setAppData(appName);
      setMessages(prev => [...prev, {
        text: `Found restriction data for ${appName}. You can now explore the data on the globe.`,
        isUser: false,
        timestamp: Date.now()
      }]);
    } catch {
      // Error will be handled by the error useEffect above
    }
    
    setTimeout(() => logDimensions('After Submit'), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>Global App Restrictions Assistant</ChatTitle>
      </ChatHeader>
      <MessagesContainer>
        <ChatMessages ref={messagesRef}>
          {messages.map((message) => (
            <Message 
              key={message.timestamp} 
              isUser={message.isUser}
              isError={message.isError}
            >
              {message.text}
            </Message>
          ))}
          <div ref={messagesEndRef} />
        </ChatMessages>
      </MessagesContainer>
      <InputContainer>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter an app name..."
          disabled={isLoading}
        />
        <SendButton onClick={handleSubmit} disabled={isLoading}>
          Send
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};