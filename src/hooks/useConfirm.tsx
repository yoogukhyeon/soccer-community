export const useConfirm = (msg: string, onConfirm: () => void) => {
    if (confirm(msg)) {
        onConfirm();
    }
};
