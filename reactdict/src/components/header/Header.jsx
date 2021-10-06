import React from 'react'
import './Header.css'
import { TextField, createTheme, ThemeProvider, MenuItem } from '@material-ui/core'
import categories from '../../data/category'
const Header = ({category, LightMode,setCategory, word, setWord}) => {

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: LightMode ? "#000":"#fff"
            },
            type: LightMode ? "light" : "dark",
        },
    });

    const handleChange = (language) => {
        setCategory(language);
        setWord("");
    }

    return (
        <div className="header">
            <span className="title">{word ? word : "Word Hunt"}</span>
            <div className="inputs">
                <ThemeProvider theme={darkTheme}>
                    <TextField  
                    label="Search a word"
                    value={word}
                    onChange = {(e) => {setWord(e.target.value)}}
                    className="search"
                    />
                    <TextField
                        select
                        className="select"
                        label="Language"
                        value={category}
                        onChange={(e) => {handleChange(e.target.value)}}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option.label} value={option.label}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default Header