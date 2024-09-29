const setItem = (key, value) => {
    if (typeof window !== 'undefined') {
        if (typeof value === 'object') {
            return localStorage.setItem(key, JSON.stringify(value));
        }

        return   localStorage.setItem(key, value);
    }
};

const getItem = (key) => {
    if (typeof window !== 'undefined') {
        const value = localStorage.getItem(key);

        if (value) {
            try {
                return JSON.parse(value);
            } catch (error) {
                return value;
            }
        }

        return null;
    }

    return null;
};

const removeItem = (key) => {
    if (typeof window !== 'undefined') {
        return localStorage.removeItem(key);
    }
};

const AppStorage = {
    setItem,
    getItem,
    removeItem
};

export default AppStorage;