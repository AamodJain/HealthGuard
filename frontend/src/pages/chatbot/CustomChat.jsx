// CustomChat.jsx
import React, { useEffect, useRef } from "react"
import "./CustomChat.css"

const CustomChat = () => {
  const botContainer = useRef(null)

  useEffect(() => {
    if (!window.WebChat || !botContainer.current) return

    window.WebChat.renderWebChat(
      {
        directLine: window.WebChat.createDirectLine({
          secret: "YOUR_DIRECT_LINE_SECRET", // Replace this!
        }),
        styleOptions: {
          backgroundColor: "#171717",
          bubbleBackground: "#2e2e2e",
          bubbleTextColor: "#ffffff",
          userBubbleBackground: "#cbaaf4",
          userBubbleTextColor: "#171717",
          bubbleBorderRadius: 8,
          botAvatarInitials: "HG",
          userAvatarInitials: "You",
          fontSizeSmall: "90%",
        },
      },
      botContainer.current
    )
  }, [])

  return <div className="custom-chat-wrapper" ref={botContainer}></div>
}

export default CustomChat
