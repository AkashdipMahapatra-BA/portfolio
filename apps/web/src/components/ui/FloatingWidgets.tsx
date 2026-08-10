"use client";

import { useState } from "react";
import { ChatBot } from "@/components/ui/ChatBot";
import { SocialFloatMenu } from "@/components/ui/SocialFloatMenu";

/**
 * FloatingWidgets — client component wrapper that coordinates
 * ChatBot and SocialFloatMenu so the hamburger correctly hides
 * when the chatbot panel is open.
 *
 * Rendered inside page.tsx (server component) to keep the rest
 * of the page purely server-rendered.
 */
export function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <ChatBot onOpenChange={setChatOpen} />
      <SocialFloatMenu chatIsOpen={chatOpen} />
    </>
  );
}
