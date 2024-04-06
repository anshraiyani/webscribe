import { useOthers, useSelf } from "@/liveblocks.config";

import styles from "./Avatars.module.css";
import React from "react";

const pictureUrls = [
  "https://liveblocks.io/avatars/avatar-1.png",
  "https://liveblocks.io/avatars/avatar-2.png",
  "https://liveblocks.io/avatars/avatar-3.png",
  "https://liveblocks.io/avatars/avatar-4.png",
  "https://liveblocks.io/avatars/avatar-5.png",
  "https://liveblocks.io/avatars/avatar-6.png",
  "https://liveblocks.io/avatars/avatar-7.png",
  "https://liveblocks.io/avatars/avatar-8.png",
];

export function Avatars() {
  const users = useOthers();

  const currentUser = useSelf();

  return (
    <div className={styles.avatars}>
      {users.map(({ connectionId, info }) => {
        return (
          <Avatar
            key={connectionId}
            picture={"https://liveblocks.io/avatars/avatar-1.png"}
            name={info.username.toString()}
          />
        );
      })}

      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <Avatar
            picture={"https://liveblocks.io/avatars/avatar-2.png"}
            name={currentUser.info.username.toString()+" (you)"}
          />
        </div>
      )}
    </div>
  );
}

export function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      <img
        src={picture}
        className={styles.avatar_picture}
        data-tooltip={name}
      />
    </div>
  );
}
