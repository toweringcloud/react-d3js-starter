import { create } from "zustand";

// 스토어의 상태와 액션에 대한 타입 정의
interface DimensionState {
  width: number;
  height: number;
  setDimensions: (width: number, height: number) => void;
}

// 스토어 생성
const useDimensionStore = create<DimensionState>((set) => ({
  width: 400,
  height: 400,
  setDimensions: (width, height) => set({ width, height }),
}));

export default useDimensionStore;
