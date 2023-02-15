interface LocalStorage {
    (key: string, id: number): boolean;
}

export const storage: LocalStorage = (key, id) => {
    const likeVal: string | null = localStorage.getItem(key);

    if (likeVal === null) {
        localStorage.setItem(key, '[]');
    }

    const prevList: any = localStorage.getItem(key);
    const prevVal: number[] = JSON.parse(prevList);

    if (!prevVal.includes(id)) {
        // 해당 게시물 처음 클릭시
        prevVal.push(id);
        localStorage.setItem(key, JSON.stringify(prevVal));

        return true;
    }

    return false;
};
