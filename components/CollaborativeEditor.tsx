"use client";

import "@blocknote/react/style.css";
import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import * as Y from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import { useRoom, useSelf } from "@/liveblocks.config";
import { useCallback, useEffect, useState } from "react";
import React from "react";

const colors = [
  "#D583F0",
  "#F08385",
  "#F0D885",
  "#85EED6",
  "#85BBF0",
  "#8594F0",
  "#85DBF0",
  "#87EE85",
];

// Collaborative text editor with simple rich text, live cursors, and live avatars
export default function CollaborativeEditor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);
    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);
  if (!doc || !provider) {
    return null;
  }
  return (
    <div className="flex justify-center">
      <BlockNote doc={doc} provider={provider} />
    </div>
  );
}

type EditorProps = {
  doc: Y.Doc;

  provider: any;
};

function BlockNote({ doc, provider }: EditorProps) {
  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf((me) => me.info);
  console.log(userInfo);
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,

      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),

      // Information for this user:
      user: {
        name: userInfo.username.toString(),
        color: colors[Math.floor(Math.random() * colors.length)],
      },
    },
  });

  return (
    <div className="border-2 m-5 border-slate-300 rounded-lg w-3/4 p-2">
      <BlockNoteView editor={editor} theme={"light"} />
    </div>
  );
}
