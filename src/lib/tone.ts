// Section backgrounds: "dark" is grainy metallic black (the default), "white" and "yellow" are flat.
export const toneClass = (tone?: string) =>
  tone === "white" ? "on-white" : tone === "yellow" ? "on-yellow" : "grain";
