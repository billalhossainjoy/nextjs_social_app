import ky from "ky"

const apiClient = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    parseJson:  (text) =>
        JSON.parse(text, (key, value) => {
            if(key.endsWith("At")) return new Date(value);
            return value
        })
})

export default apiClient;