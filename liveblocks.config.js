import { createClient } from "@liveblocks/client";
import { createRoomContext, createLiveblocksContext } from "@liveblocks/react";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
});

// Room-level hooks, use inside `RoomProvider`
export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersListener,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
    useThreadSubscription,
    useMarkThreadAsRead,
    useRoomNotificationSettings,
    useUpdateRoomNotificationSettings,

    // These hooks can be exported from either context
    // useUser,
    // useRoomInfo
  },
} = createRoomContext(client);

// Project-level hooks, use inside `LiveblocksProvider`
export const {
  suspense: {
    LiveblocksProvider,
    useMarkInboxNotificationAsRead,
    useMarkAllInboxNotificationsAsRead,
    useInboxNotifications,
    useUnreadInboxNotificationsCount,

    // These hooks can be exported from either context
    useUser,
    useRoomInfo,
  },
} = createLiveblocksContext(client);
