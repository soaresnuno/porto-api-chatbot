import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { MessageInputProps } from "@/components/types";

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="border-t pt-4 bg-background w-full">
      <form
        onSubmit={handleSubmit}
        className="flex justify-between items-center gap-4"
      >
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>
        <div>
          <Button
            type="submit"
            size="icon"
            className="bg-red-600 hover:bg-red-500 w-full p-6"
            disabled={!message.trim()}
          >
            Send
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
