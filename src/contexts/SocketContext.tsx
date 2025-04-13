// import React, { createContext, useContext, useEffect, useState } from "react";
// import io from "socket.io-client";

// type SocketType = ReturnType<typeof io>;

// const SocketContext = createContext<SocketType | null>(null); // Specify the context type

// export const SocketProvider = ({ children }: any) => {
//   const [socket, setSocket] = useState<SocketType | null>(null);

//   useEffect(() => {
//     const newSocket = io(process.env.API_URL as string);
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to your websocket server (wherever it's hosted)
    const socketInstance = io("YOUR_SOCKET_SERVER_URL", {
      withCredentials: true,
      // You can pass auth tokens here if needed
      // auth: { token: userToken }
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
