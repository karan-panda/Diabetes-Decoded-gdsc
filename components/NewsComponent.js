import React, { useEffect, useState } from 'react';

const NewsComponent = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('https://newsapi.org/v2/everything?q=diabetes&apiKey=272537c253ce4bb3b56199385a550c90')
            .then(response => response.json())
            .then(data => setNews(data.articles));
    }, []);

    return (
        <div className="bg-gray-200 rounded-lg p-4 flex-grow space-y-4 overflow-y-scroll h-52">
            <h2 className="text-lg font-semibold mb-4">News on Diabetes</h2>
            {news.map((article, index) => (
                <div key={index} className='bg-white rounded-md flex'>
                    <div className='w-1/4 m-2 flex items-center'>
                        <img src={article.urlToImage} alt={article.title} className='w-full h-24 object-cover rounded-md' />
                    </div>
                    <div className='w-3/4 pl-4'>
                        <h3 className='font-bold'>{article.title}</h3>
                        <p>{article.description}</p>
                        <a href={article.url} className='text-blue-800'>Read more</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsComponent;