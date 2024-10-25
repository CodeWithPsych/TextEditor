import  { useState } from 'react';
import PropTypes from 'prop-types';

export default function TextForm({ mode, text, showalert }) {
    const [words, setWords] = useState(0);
    const [chars, setChars] = useState(0);
    const [textValue, setText] = useState('');

    const handleOnChange = (event) => {
        const newText = event.target.value;
        setText(newText);

        // Count non-empty words
        const newWordCount = newText.trim().split(/\s+/).filter(word => word !== '').length;

        // Count characters excluding spaces
        const newCharCount = newText.replace(/\s/g, '').length;

        setWords(newWordCount);
        setChars(newCharCount);
    };

    const handleUpClick = () => {
        let newText = textValue.toUpperCase();
        setText(newText);
    };

    const handleLowClick = () => {
        let newText = textValue.toLowerCase();
        setText(newText);
    };

    const clearText = () => {
        setText('');
    };

    const removeSpaces = () => {
        let newText = textValue.split(/[ ]+/);
        setText(newText.join(' '));
    };

    const copyText = () => {
        let textArea = document.getElementById('Textarea');
        textArea.select();
        navigator.clipboard.writeText(textArea.value);
        showalert("The text is copied to ClipBoard", "success");
    };

    const handleUpClickFirstWord = () => {
        let wordsArray = textValue.split(/\s+/);

        let capitalizedWords = wordsArray.map(word => {
            if (word.length > 0) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            } else {
                return word;
            }
        });

        let newText = capitalizedWords.join(' ');
        setText(newText);
    };

    const handleUpClickFirstWordLine = () => {
        let sentences = textValue.split(/([.?!]\s*)/);

        for (let i = 0; i < sentences.length; i++) {
            if (sentences[i] !== undefined && sentences[i] !== null && sentences[i] !== "") {
                sentences[i] = sentences[i].charAt(0).toUpperCase() + sentences[i].slice(1);
            }
        }

        let newText = sentences.join('');
        setText(newText);
    };

    return (
        <div>
            <div className="container" style={{
                color: mode === 'light' ? 'black' : 'white',
            }}>
                <h1 className="my-4">{text}</h1>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        value={textValue}
                        onChange={handleOnChange}
                        style={{
                            position: 'relative',
                            color: mode === 'dark' ? 'white' : 'black',
                            backgroundColor: mode === 'dark' ? 'gray' : 'white',
                            caretColor: mode === 'dark' ? 'white' : 'black',
                            cursor: 'pointer',
                        }}
                        id="Textarea"
                        rows="8"
                    ></textarea>
                </div>
                <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>
                    Convert to UpperCase
                </button>
                <button className="btn btn-primary mx-1 my-1" onClick={handleUpClickFirstWord}>
                    Capitalize Each First Word
                </button>
                <button className="btn btn-primary mx-1 my-1" onClick={handleUpClickFirstWordLine}>
                    Capitalize First Word of New Line
                </button>
                <button className="btn btn-primary mx-1 my-1" onClick={handleLowClick}>
                    Convert to LowerCase
                </button>
                <button className="btn btn-primary mx-1 my-1" onClick={removeSpaces}>
                    Remove Extra Spaces
                </button>
                <button className="btn btn-primary mx-1 my-1" onClick={copyText}>
                    Copy Text
                </button>
                <button className="btn btn-primary mx-1 my-1" onClick={clearText}>
                    Clear Text
                </button>
                <h2 className="my-2">Your text summary</h2>
                <p style={{
                    color: mode === 'light' ? 'black' : 'red',
                }}>
                    {textValue.trim().length === 0 ? '0 words and 0 characters' : `${words} words and ${chars} characters`}
                </p>

                <h2 className="my-1">Preview</h2>
                <p>{textValue === "" ? "Enter some content and it will show here" : textValue}</p>
            </div>
        </div>
    );
}

// PropTypes validation
TextForm.propTypes = {
    mode: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    showalert: PropTypes.func.isRequired,
};
