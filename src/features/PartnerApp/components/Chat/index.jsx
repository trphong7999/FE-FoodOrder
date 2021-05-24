import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import "./style.scss";
import { IoSend } from "react-icons/io5";
import socket from "socket-io";
import orderApi from "api/orderApi";
import ScrollToBottom from "react-scroll-to-bottom";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Chat() {
  const [chatMessage, setChatMessage] = useState("");
  const [chatData, setChatData] = useState("");
  const history = useHistory();
  const order = useLocation().state.order;
  const { userOrderId } = order;
  let input = useRef(null);

  const chatAction = () => {
    if (chatMessage) {
      socket.emit("chatAction", {
        order_id: order._id,
        type: 0,
        message: chatMessage,
      });
      setChatData([...chatData, { type: 0, content: chatMessage }]);
      setChatMessage("");
    }
  };
  socket.on("chatAction", (message) => {
    if (message.type === 1) setChatData([...chatData, message]);
  });
  useEffect(() => {
    const fetchChatData = async () => {
      const chatData = await orderApi.getChatData(order._id);
      setChatData(chatData);
    };
    fetchChatData();
  }, []);

  return (
    <div className="main-info__item">
      <div className="item-chat">
        <div className="item-chat__partner">
          <div
            className="head-back"
            onClick={() => {
              history.goBack();
            }}
          >
            <AiOutlineArrowLeft />
          </div>
          <img src={userOrderId.info.avt} alt="avt-user" />
          <span>{userOrderId.info.name}</span>
        </div>
        <ScrollToBottom className="scroll item-chat__content">
          <div className="">
            {chatData.length > 0
              ? chatData.map((chat, index) =>
                  chat.type == 0 ? (
                    <div key={index} className="content-parter">
                      <img
                        src={order.deliverId.avt}
                        alt="partnerAvt"
                        width="32"
                      />
                      <div className="content">{chat.content}</div>
                    </div>
                  ) : (
                    <div key={index} className="content-user">
                      <div className="content">{chat.content} </div>{" "}
                      <img
                        src={order.userOrderId.info.avt}
                        alt="userAvt"
                        width="32"
                      />
                    </div>
                  )
                )
              : ""}
          </div>
        </ScrollToBottom>

        <div className="item-chat__input">
          <input
            type="text"
            className="input-text"
            placeholder="Type a message..."
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          />
          <span className="input-send">
            <IoSend className="input-send__icon" onClick={() => chatAction()} />
          </span>
        </div>
      </div>
    </div>
  );
}
