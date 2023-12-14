// store/users.ts
import { atom } from "nanostores";

export const $menuopen = atom<boolean>(false);

export function toggle(value) {
  $menuopen.set(value);
}
