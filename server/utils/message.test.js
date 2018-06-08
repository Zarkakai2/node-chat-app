const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        const from = 'Author';
        const text = 'Hey you!';
        const res = generateMessage(from, text);
        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(typeof res.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate the correct maps url', () => {
        const from = 'Author';
        const latitude = -33.1;
        const longitude = 56.8;
        const res = generateLocationMessage(from, latitude, longitude);
        expect(res.from).toBe(from);
        expect(res.url).toBe(`https://www.google.com/maps?q=-33.1,56.8`);
        expect(typeof res.createdAt).toBe('number');
    });
});