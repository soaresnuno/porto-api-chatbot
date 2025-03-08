import { ScrollArea } from "@/components/ui/scroll-area";
import { Message as MessageType, User } from "@/components/types";
import { Message } from "./Message";
import { Skeleton } from "./ui/skeleton";

interface ChatAreaProps {
  messages: MessageType[];
  users: User[];
  loading: boolean;
}

export function ChatArea({ messages, users, loading }: ChatAreaProps) {
  return (
    <ScrollArea className="h-[600px] overflow-auto">
      <div className="space-y-6">
        {messages.map((message) => {
          const user = users.find((u) => u.id === message.userId);
          return (
            <Message
              key={message.id}
              message={message}
              user={
                user || {
                  id: "unknown",
                  name: "Unknown User",
                  avatar: "",
                  online: false,
                }
              }
            />
          );
        })}

        {loading && (
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
