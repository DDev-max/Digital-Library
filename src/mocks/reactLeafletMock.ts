const setView = jest.fn();

const useMap = jest.fn(() => ({
    setView,
}));

module.exports = {
    useMap,
};