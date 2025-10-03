import React, { useState, useRef, useEffect } from "react";

const ChatBox = ({ messages = [], onSend }) => {
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (input.trim()) {
            onSend(input);
            setInput("");
        }
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <div className="flex flex-col h-96 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
            <div className="flex-1 overflow-y-auto space-y-2 mb-3">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-2 rounded-lg max-w-xs ${msg.self ? "bg-blue-100 self-end ml-auto" : "bg-gray-100 self-start mr-auto"}`}
                    >
                        <span className="text-gray-900 dark:text-gray-800">{msg.text}</span>
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
            </div>
            <div className="flex">
                <input
                    className="flex-1 border rounded-l px-3 py-2 outline-none"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Type your message..."
                />
                <button
                    className="bg-blue-600 text-white px-4 rounded-r"
                    onClick={handleSend}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
