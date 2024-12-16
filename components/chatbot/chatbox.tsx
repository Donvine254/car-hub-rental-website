"use client";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  RefreshCcw,
  X,
  Send,
  AlertTriangle,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useChat } from "ai/react";
import Script from "next/script";
import Image from "next/image";

interface ChatBoxProps {
  isMobile: boolean;
  onClose: () => void;
}
declare const marked: any;
const formatDate = (input: string | number = Date.now()) => {
  const now = new Date(input);
  return now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const ChatBox: React.FC<ChatBoxProps> = ({ isMobile, onClose }) => {
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    isLoading,
  } = useChat({
    api: "/api/chat",
  });
  const [feedback, setFeedback] = useState<
    Record<string, "like" | "dislike" | null>
  >({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  async function handleOptionClick(option: string) {
    handleInputChange({
      target: { value: option },
    } as React.ChangeEvent<HTMLInputElement>);
  }

  async function handleRefresh() {
    setMessages([]);
  }

  return (
    <div
      className={`${
        isMobile
          ? "fixed inset-0"
          : "fixed bottom-4 right-4 w-[400px] h-[600px]"
      } flex flex-col bg-white border md:max-h-[80%] shadow rounded-lg overflow-hidden`}>
      <Script
        src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"
        async
        defer
      />
      <div className="flex flex-row items-center py-3 px-4 border-b bg-gradient-to-r from-green-400  to-blue-400 text-white">
        <div className="flex items-center gap-2">
          <Image
            alt="bot avatar"
            src="https://res.cloudinary.com/dipkbpinx/image/upload/v1734387416/carhub/avatars/o2pky8rdruuxi7cozdlo.png"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />

          <span className="font-semibold ">Auto Assist</span>
        </div>
        <div className="ml-auto flex gap-2">
          {/* reset messages to their initial state */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            title="refresh chat"
            className="h-8 w-8 text-white hover:text-gray-700">
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            title="close"
            className="h-8 w-8 text-white hover:text-red-500">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-grow overflow-hidden">
        <ScrollArea
          className="h-full"
          ref={scrollAreaRef as React.RefObject<HTMLDivElement>}>
          <div className="p-4">
            <div className="text-center text-sm text-gray-500 mb-4">
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            {/* show initial messages first */}
            <>
              {initialMessages.map((message, index) => (
                <div key={index} className="mb-4">
                  {!message.isUser && (
                    <div className="flex items-center gap-2 mb-2">
                      <Image
                        alt="bot avatar"
                        src="https://res.cloudinary.com/dipkbpinx/image/upload/v1734387416/carhub/avatars/o2pky8rdruuxi7cozdlo.png"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-600 font-semibold">
                        Auto Assist
                      </span>
                    </div>
                  )}
                  <div
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}>
                    <div
                      className={`flex flex-col gap-1 ${
                        message.isUser ? "items-end" : "items-start"
                      } w-full`}>
                      <div
                        className={`p-3 rounded-2xl ${
                          message.isUser
                            ? "bg-[#22C55E] text-white"
                            : "bg-gray-100 text-gray-800"
                        }
                                                    ${
                                                      message.isUser
                                                        ? "ml-12"
                                                        : "mr-12"
                                                    }`}>
                        <p className="text-sm whitespace-pre-wrap">
                          {message.text}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 px-1">
                        {message.timestamp}
                      </span>
                      {message.options && (
                        <div className="flex flex-wrap-reverse justify-end items-center gap-2 mt-2 w-full">
                          {message.options.map((option, optionIndex) => (
                            <button
                              key={optionIndex}
                              onClick={() => handleOptionClick(option.question)}
                              className={`py-2 px-3 w-fit text-sm text-left rounded-md text-green-600 bg-green-100 hover:bg-green-500 hover:text-white ${
                                optionIndex === message.options!.length - 1
                                  ? "bg-green-500 text-white"
                                  : "bg-green-100 text-green-600"
                              } hover:opacity-90 transition-opacity`}>
                              {option.text}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
            {messages.map((message, index) => (
              <div key={index} className="mb-4">
                {message.role !== "user" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      alt="bot avatar"
                      src="https://res.cloudinary.com/dipkbpinx/image/upload/v1734387416/carhub/avatars/o2pky8rdruuxi7cozdlo.png"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-600 font-semibold">
                      Auto Assist
                    </span>
                  </div>
                )}
                <div
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}>
                  <div
                    className={`flex flex-col gap-1 ${
                      message.role === "user" ? "items-end" : "items-start"
                    } w-full`}>
                    <div
                      className={`py-2 px-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-[#22C55E] text-white"
                          : "bg-[#f2f2f2] text-gray-800"
                      } ${message.role === "user" ? "ml-12" : "mr-12"}`}>
                      {message.role === "assistant" ? (
                        <div
                          className="marked"
                          dangerouslySetInnerHTML={{
                            __html: marked.parse(message.content),
                          }}></div>
                      ) : (
                        <p className="break-words">{message.content}</p>
                      )}
                    </div>
                    <div className="flex justify-between gap-4 items-center">
                      <span className="text-xs text-gray-500 px-1">
                        {message.createdAt
                          ? `${formatDate(message.createdAt?.toISOString())}`
                          : `${formatDate(new Date().toISOString())}`}
                      </span>
                      {/* {message.role === "assistant" && (
                        <div className="flex items-center gap-2 ">
                          <button
                            title="good response"
                            disabled={feedback === "dislike"}
                            onClick={() => setFeedback("like")}
                            className={`text-xs  px-1 py-0.5 hover:bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hidden ${
                              feedback === "like"
                                ? "text-green-500"
                                : "text-gray-700"
                            }`}>
                            <ThumbsUp size={12} />
                          </button>
                          <button
                            title="bad response"
                            disabled={feedback === "like"}
                            onClick={() => setFeedback("dislike")}
                            className={`text-xs  px-1 py-0.5 hover:bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hidden ${
                              feedback === "dislike"
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}>
                            <ThumbsDown size={12} />
                          </button>
                        </div>
                      )} */}
                      {message.role === "assistant" && (
                        <div className="flex items-center gap-2">
                          <button
                            title="Good response"
                            disabled={feedback[message.id] === "dislike"}
                            onClick={() =>
                              setFeedback((prev) => ({
                                ...prev,
                                [message.id]:
                                  prev[message.id] === "like" ? null : "like",
                              }))
                            }
                            className={`text-xs px-1 py-0.5 hover:bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hidden ${
                              feedback[message.id] === "like"
                                ? "text-green-500"
                                : "text-gray-700"
                            }`}>
                            <ThumbsUp size={12} />
                          </button>
                          <button
                            title="Bad response"
                            disabled={feedback[message.id] === "like"}
                            onClick={() =>
                              setFeedback((prev) => ({
                                ...prev,
                                [message.id]:
                                  prev[message.id] === "dislike"
                                    ? null
                                    : "dislike",
                              }))
                            }
                            className={`text-xs px-1 py-0.5 hover:bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hidden ${
                              feedback[message.id] === "dislike"
                                ? "text-red-500"
                                : "text-gray-700"
                            }`}>
                            <ThumbsDown size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {error && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Image
                    alt="bot avatar"
                    src="https://res.cloudinary.com/dipkbpinx/image/upload/v1734387416/carhub/avatars/o2pky8rdruuxi7cozdlo.png"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-600 font-semibold">
                    Auto Assist
                  </span>
                </div>
                <div className="px-3 py-2 flex items-center gap-2 bg-red-100 text-gray-500 border-2 border-red-400 rounded-md">
                  <AlertTriangle size={16} /> <span>Something went wrong.</span>
                </div>
              </div>
            )}
            {isLoading && (
              <div className="flex items-center gap-1 mb-2">
                <Image
                  alt="bot avatar"
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1734387416/carhub/avatars/o2pky8rdruuxi7cozdlo.png"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
                <div className=" bg-[#f2f2f2] py-3 px-10 rounded-lg ">
                  <div className="typing"></div>
                </div>
              </div>
            )}
          </div>
          <div ref={bottomRef} />
        </ScrollArea>
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            minLength={5}
            name="input"
            placeholder="Type your message..."
            className="flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Button
            type="submit"
            size="icon"
            id="submit"
            title="submit message"
            disabled={!input}
            className="bg-[#22C55E] hover:bg-[#1ea550] disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

const initialMessages = [
  {
    text: "Hi! 👋 I'm an FAQ bot designed to answer questions about our rental services. How can I help you today?",
    isUser: false,
    timestamp: formatDate(),
  },
  {
    text: "What would you like to know about our services?",
    isUser: false,
    timestamp: formatDate(),
    options: [
      {
        text: "Insurance Options",
        question: "What insurance options are available for the rental cars?",
      },
      {
        text: "Pricing and Payment",
        question: "How does the pricing work and are there any hidden charges?",
      },
      {
        text: "Vehicle Return",
        question: "How should I return the vehicle after the rental period?",
      },
      {
        text: "Cancellation Policy",
        question: "What is carhub cancellation policy for vehicle bookings?",
      },
      {
        text: "Rental Requirements",
        question:
          "What are the age requirements for renting a car? What documents do i need to provide?",
      },
    ],
  },
];
