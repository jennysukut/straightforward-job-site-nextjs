import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useSocket } from "@/contexts/SocketContext";

// Define your GraphQL query for message history
const GET_MESSAGES = gql`
  query GetMessages($conversationId: ID!) {
    messages(conversationId: $conversationId) {
      app {
        id
      }
      id
      text
      sender
      date
      timestamp
      edited
      read
    }
  }
`;

interface Message {
  app: {
    id: string;
  };
  id: string;
  text: string;
  sender: string;
  date: any;
  timestamp: any;
  edited: boolean;
  read: boolean;
}

const MessagingCenter: React.FC<{ conversationId: string }> = ({
  conversationId,
}) => {
  // Get message history via GraphQL
  const { loading, data } = useQuery(GET_MESSAGES, {
    variables: { conversationId },
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const { socket, isConnected } = useSocket();

  // Load initial messages from GraphQL query
  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    }
  }, [data]);

  // Listen for new messages via Socket.io
  useEffect(() => {
    if (!socket) return;

    // Join the specific conversation room
    socket.emit("joinConversation", conversationId);

    // Listen for new messages
    socket.on("newMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("newMessage");
      socket.emit("leaveConversation", conversationId);
    };
  }, [socket, conversationId]);

  // Function to send a message
  const sendMessage = (content: string) => {
    if (!socket || !isConnected) return;

    socket.emit("sendMessage", {
      conversationId,
      content,
      // You'd include the sender ID from your auth context
      senderId: "current-user-id",
    });
  };

  if (loading) return <div>Loading messages...</div>;

  return (
    <div>
      {/* Your UI components for displaying messages */}
      {/* Message sending form */}
    </div>
  );
};
