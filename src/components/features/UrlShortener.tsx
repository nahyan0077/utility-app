import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";

export const UrlShortner: React.FC = () => {
    const [longURL, setLongURL] = useState('');
    const [shortURL, setShortURL] = useState('');
    const [error, setError] = useState('');

    const handleClick = async () => {
        try {
            console.log(longURL,"loggg");
            
            const response = await axios.get(`https://api.tinyurl.com/create?url=${encodeURIComponent(longURL)}&api_token=EBdfL9kaLuoBAolHj1UDs8KISQnpYqz9T3VN1dfJYPysWuD8tnZqWM6gu1Po`);
            console.log(response);
            
            setShortURL(response.data.result.full_short_link);
            setError(''); 
        } catch (error) {
            setShortURL(''); 
            setError('Failed to shorten URL. Please try again.');
            console.error(error);
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                URL Shortener
            </h1>
            <div className="space-y-4">
                <Input
                    type="text"
                    value={longURL}
                    onChange={(e) => setLongURL(e.target.value)}
                    placeholder="Enter your long URL here"
                />
                <Button onClick={handleClick}>Shorten URL</Button>
                {shortURL && (
                    <div className="mt-4">
                        <p>Your short URL:</p>
                        <a href={shortURL} target="_blank" rel="noopener noreferrer" className="text-blue-600">{shortURL}</a>
                    </div>
                )}
                {error && (
                    <div className="mt-4 text-red-600">
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UrlShortner;
