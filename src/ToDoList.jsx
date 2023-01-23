import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import icon from "./icon.png"

const ToDoList = () => {

    const getLocalStorageItems = () => {
        const data = localStorage.getItem("ArrayList")
        if (data) {
            return JSON.parse(localStorage.getItem("ArrayList"))
        } else {
            return []
        }
    }


    const [input, setInput] = useState("")
    const [list, setList] = useState(getLocalStorageItems)
    const [DarkIcon, setDarkIcon] = useState(false)
    const [save, setSave] = useState(false)
    const [index, setIndex] = useState()

    const getInput = (e) => {
        setInput(e.target.value)
    }
    const getList = () => {
        if (input !== "") {
            setList([...list, input])
            setInput("")
        }
    }
    const deleteList = (index) => {
        const updatedList = list.filter((val, i) => {
            return i !== index
        })
        setList(updatedList)
    }
    const ClearAll = () => {
        setList([])
    }

    useEffect(() => {
        localStorage.setItem("ArrayList", JSON.stringify(list))
    }, [list])

    const darkModE = () => {
        const body = document.body
        body.classList.toggle("darkMode")
    }
    const showSun = () => {
        setDarkIcon(true)
    }
    const darkMoon = () => {
        setDarkIcon(false)
    }

    const edit = (index) => {
        setInput(list[index])
        setSave(true)
        setIndex(index)

        window.scrollTo({ top: 0, behavior: 'smooth'});

    }
    const saveNew = () => {
        setSave(false)
        list.splice(index, 1, input)
        localStorage.setItem("ArrayList", JSON.stringify(list))
        setInput("")
    }


    return (
        <>
            <div className="dark_mode_btn" onClick={darkModE}>
                {
                    DarkIcon ? <ion-icon name="sunny-outline" onClick={darkMoon}></ion-icon> : <ion-icon name="moon-sharp" onClick={showSun}></ion-icon>
                }
            </div>
            <div className="container">
                <img src={icon} alt="icon" />
                <div className='heading'>
                    Add your list here 📝📝📝.
                </div>
                <div className="input">
                    <input type="text" placeholder='Type here ✍... '
                        value={input}
                        onChange={getInput}
                    />
                    {
                        save ? <ion-icon name="bookmark-outline" onClick={saveNew}></ion-icon> : <ion-icon name="add-outline" onClick={getList}></ion-icon>
                    }
                </div>
                <div className="list">

                    {
                        list.map((val, ind) => {
                            return <div className="listItem" key={ind}>
                                <span className="text">{val}</span>
                                <ion-icon name="create-outline" onClick={() => edit(ind)}></ion-icon>
                                <ion-icon name="trash-outline" tittle="delete" onClick={() => deleteList(ind)}></ion-icon>
                            </div>
                        })
                    }

                </div>
                <div className="btn">
                    <button onClick={ClearAll}>Clear all</button>
                </div>
            </div>
        </>
    )
}

export default ToDoList