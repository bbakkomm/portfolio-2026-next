import { create } from "zustand";
import { StateCreator } from "zustand";

// ─── AdminUser 타입 ─────────────────────────────────────────
export interface AdminUser {
  id: string | null;
  email: string | null;
  role: string | null;
  nickname: string | null;
}

// ─── Auth Slice ──────────────────────────────────────────────
interface AuthSlice {
  authentication: boolean;
  user: AdminUser | null;
  setAuth: (user: AdminUser) => void;
  removeAuth: () => void;
}

const createAuthSlice: StateCreator<StoreState, [], [], AuthSlice> = (set) => ({
  authentication: false,
  user: null,

  setAuth: (user) =>
    set({
      authentication: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        nickname: user.nickname,
      },
    }),

  removeAuth: () =>
    set({
      authentication: false,
      user: null,
    }),
});

// ─── Page Transition Slice ───────────────────────────────────
interface TransitionSlice {
  isTransitioning: boolean;
  setTransitioning: (v: boolean) => void;
}

const createTransitionSlice: StateCreator<
  StoreState,
  [],
  [],
  TransitionSlice
> = (set) => ({
  isTransitioning: false,
  setTransitioning: (v) => set({ isTransitioning: v }),
});

// ─── 통합 Store ──────────────────────────────────────────────
// persist 제거: SSR 환경에서 localStorage 충돌 방지.
// 인증 상태는 Supabase Auth onAuthStateChange로 관리.
interface StoreState extends AuthSlice, TransitionSlice {}

const useStore = create<StoreState>()((...args) => ({
  ...createAuthSlice(...args),
  ...createTransitionSlice(...args),
}));

export default useStore;
