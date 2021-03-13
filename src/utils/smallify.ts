interface CharsetGroup {
  uppercase: string;
  lowercase: string;
}

export default (message: string): string => {
  const base: CharsetGroup = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
  };
  const small: CharsetGroup = {
    uppercase: "ᴬᴮ ᴰᴱ ᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾ ᴿ ᵀᵁⱽᵂ   ",
    lowercase: "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖ ʳˢᵗᵘᵛʷˣʸᶻ",
  };

  const result = message
    .split("")
    .map(char => {
      const baseUppercaseIndex = base.uppercase.indexOf(char);
      const baseLowercaseIndex = base.lowercase.indexOf(char);

      if (baseUppercaseIndex === -1 && baseLowercaseIndex === -1) return char;

      const charset = baseUppercaseIndex !== -1 ? "uppercase" : "lowercase";
      const auxCharset = charset === "uppercase" ? "lowercase" : "uppercase";

      const index =
        baseUppercaseIndex !== -1 ? baseUppercaseIndex : baseLowercaseIndex;

      const mainReplace = small[charset][index];
      const auxReplace = small[auxCharset][index];

      return auxReplace !== " "
        ? auxReplace
        : mainReplace !== " "
        ? mainReplace
        : char;
    })
    .join("");

  return result;
};
