"use client";
import { ChatArea } from "@/components/ChatArea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Message, User } from "@/components/types";
import { useEffect, useState } from "react";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { MessageInput } from "@/components/MessageInput";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Porto Artificial Intelligence Agent",
      avatar: "/images/api.jpeg",
      online: true,
    },
    {
      id: "2",
      name: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
    },
  ]);

  useEffect(() => {
    if (open) {
      setMessages([
        {
          id: "1",
          userId: "1",
          text: "Hey! How can I help you today?",
          timestamp: new Date(),
        },
      ]);
    } else {
      setMessages([]);
    }
  }, [open]);

  const cleanResponse = (text: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return text.replace(/<think>.*?<\/think>/gs, "").trim();
  };

  const handleSendMessage = async (text: string, userId: string) => {
    const userMessage = {
      id: crypto.randomUUID(),
      userId,
      text,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      if (data.reply) {
        const aiMessage = {
          id: crypto.randomUUID(),
          userId: "1",
          text: cleanResponse(data.reply),
          timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay />
        <DialogTrigger asChild>
          <Button variant="secondary">Contact Customer Service</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle asChild>
              <h2 className="text-lg font-semibold">Customer Service Chat</h2>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <ChatArea messages={messages} users={users} loading={loading} />
          </DialogDescription>
          <DialogFooter>
            <MessageInput
              onSendMessage={(text) => handleSendMessage(text, "2")}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
