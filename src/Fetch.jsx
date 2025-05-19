import React, { useEffect, useState } from 'react';

const Fetch = () => {
    const [list, setList] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetcher = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            setList(data.slice(0, 20));
        };
        fetcher();
    }, []);

    const toggleCompleted = (id) => {
        setList((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const filteredList = list.filter((item) => {
        if (filter === 'completed') return item.completed;
        if (filter === 'active') return !item.completed;
        return true;
    });

    return (
        <div>

            <div style={{ marginBottom: '1rem' }}>
                <button onClick={() => setFilter('all')}>Все</button>
                <button onClick={() => setFilter('active')}>Активные</button>
                <button onClick={() => setFilter('completed')}>Выполненные</button>
            </div>

            <ul>
                {filteredList.map((item) => (
                    <li key={item.id}>
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleCompleted(item.id)}
                        />
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Fetch;
