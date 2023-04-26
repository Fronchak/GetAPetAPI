export const isBlank = (text: string | undefined): boolean => {
    return text?.trim() ? false : true;
}

export const cleanString = (text: string): string => {
    return text.trim().replace(/\s{2,}/g, " ");
}

export const cleanInput = (input: string | undefined): string | undefined => {
    return input === undefined ? undefined : cleanString(input);
}