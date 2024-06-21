import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HashForm = () => {
    const [password, setPassword] = useState('');
    const [hash, setHash] = useState('');
    const [message, setMessage] = useState('');
    const [crackedPassword, setCrackedPassword] = useState('');

    useEffect(() => {
        // Function to handle hashing whenever 'createHash' input changes
        const hashInput = async () => {
            const inputValue = password.trim();

            if (inputValue.length > 0) {
                // Hash the input value
                const encoder = new TextEncoder();
                const data = encoder.encode(inputValue);
                const hashBuffer = await crypto.subtle.digest('SHA-256', data);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

                // Set the hashed value to 'hash' state
                setHash(hashHex);
            } else {
                // Clear the hash if input is empty
                setHash('');
            }
        };

        hashInput(); // Initial hash when component mounts

        // Add event listeners for 'createHash' input
        const inputElement = document.getElementById('createHash');
        inputElement.addEventListener('input', hashInput);

        // Cleanup event listener on component unmount
        return () => {
            inputElement.removeEventListener('input', hashInput);
        };
    }, [password]); // Dependency on 'password' state for effect re-run

// Inside HashForm component
const handleSubmit = async (e) => {
    e.preventDefault();

    // Hashing the password
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    try {
        // Sending hashed password to server
        const response = await axios.post('/submit', { hashed_password: hashHex });
        setMessage(response.data.message);
    } catch (error) {
        console.error(error);
        setMessage('An error occurred.');
    }
};


    const crackHash = async () => {
        const hashInput = document.getElementById('hash').value.trim();
        const resultDiv = document.getElementById('createString');

        if (!hashInput) {
            resultDiv.textContent = 'Please enter a hash value.';
            return;
        }

        try {
            const response = await fetch('../data/data.txt');
            const dictionary = await response.text();
            const words = dictionary.split('\n');

            // Iterate over each word in the dictionary
            for (const word of words) {
                const trimmedWord = word.trim();
                if (trimmedWord === '') continue;

                // Hash the current word from dictionary
                const encoder = new TextEncoder();
                const data = encoder.encode(trimmedWord);
                const hashBuffer = await crypto.subtle.digest('SHA-256', data);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

                // Compare the generated hash with the input hash
                if (hashHex === hashInput) {
                    setCrackedPassword(trimmedWord);
                    resultDiv.textContent = `Password cracked: ${trimmedWord}`;
                    return;
                }
            }

            resultDiv.textContent = 'No match found.';
        } catch (error) {
            console.error(error);
            resultDiv.textContent = 'Error occurred during cracking.';
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <section className='text-center mb-8'>
                <b><p className='mb-4'>Hashing should be done on the server side!</p></b>
                <form id="passwordForm" onSubmit={handleSubmit} className='mb-8'>
                    <textarea
                        placeholder="String value"
                        className="border-2 border-blue-500 w-full mb-4 p-2"
                        type="text"
                        id="createHash"
                        name="name"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></textarea>
                    <textarea
                        placeholder="Hashed value"
                        className="border-2 border-blue-500 w-full mb-4 p-2"
                        id="hashedOutput"
                        type="text"
                        readOnly
                        value={hash}
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                        Submit Hashed
                    </button>
                    <button
                        type="button"
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-4"
                        onClick={() => navigator.clipboard.writeText(hash)}
                    >
                        Copy Hashed
                    </button>
                </form>

                <section className='text-center'>
                    <textarea
                        placeholder="Input Hashed value"
                        className="border-2 border-blue-500 w-full mb-4 p-2"
                        type="text"
                        id="hash"
                        name="name"
                        required
                    ></textarea>
                    <textarea
                        placeholder="Cracked Password"
                        className="border-2 border-blue-500 w-full mb-4 p-2"
                        type="text"
                        id="createString"
                        name="name"
                        readOnly
                        value={crackedPassword}
                    ></textarea>
                    <button
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={crackHash}
                    >
                        Crack Hashed
                    </button>
                    <button
                        type="button"
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-4"
                        onClick={() => navigator.clipboard.writeText(crackedPassword)}
                    >
                        Copy Cracked Password
                    </button>
                </section>
            </section>
        </div>
    );
};

export default HashForm;
