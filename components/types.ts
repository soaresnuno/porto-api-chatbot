export interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

export interface Message {
  id: string;
  userId: string;
  text: string;
  timestamp: Date;
}

export interface MessageProps {
  message: Message;
  user: User;
}

export interface MessageInputProps {
  onSendMessage: (text: string) => void;
}
