import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDistanceToNow } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageProps } from "@/components/types";

export function Message({ message, user }: MessageProps) {
  return (
    <div className="flex group w-[80%]">
      <Avatar className="h-9 w-9 mr-3 mt-1">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
        <div className="flex items-center mb-1">
          <h3 className="font-semibold text-sm">{user.name}</h3>
          <span className="ml-2 text-xs text-muted-foreground">
            {formatDistanceToNow(message.timestamp)}
          </span>
        </div>
        <div className="text-sm text-gray-800 dark:text-gray-200 flex-wrap w-[85%]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              strong: ({ children }) => (
                <strong className="text-red-600">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="text-blue-600">{children}</em>
              ),
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              code: ({ inline, className, children }) => {
                const codeClass = className ? className : "language-js";
                return inline ? (
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">
                    {children}
                  </code>
                ) : (
                  <pre className="bg-black text-white p-3 rounded-md ">
                    <code className={codeClass}>{children}</code>
                  </pre>
                );
              },
              pre: ({ children }) => (
                <pre className="bg-black text-white p-3 rounded-md">
                  {children}
                </pre>
              ),
              p: ({ children }) => {
                if (typeof children === "object" && Array.isArray(children)) {
                  if (children.length === 1 && children[0]?.type === "pre") {
                    return children[0];
                  }
                }
                return <p className="mb-2">{children}</p>;
              },
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
