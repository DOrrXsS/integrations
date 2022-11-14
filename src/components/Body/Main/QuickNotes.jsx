import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
    addNote,
    deleteNote
    , getNotes, NoteType, setNotes, TaskList
} from '../../../assets/data/notesData';
import addIcon from '../../../assets/imgs/icons/add.svg';
import minusIcon from '../../../assets/imgs/icons/minus.svg';
import rightIcon from '../../../assets/imgs/icons/right.svg';
import deepCopy from '../../../assets/methods/deepCopy';

export default function QuickNotes() {
    let [notesData, setNotesData] = useState([]);
    let [showStates, setShowStates] = useState({});
    useEffect(() => {
        getNotes().then(notes => {
            setNotesData(notes.sort((noteObj1, noteObj2) => {
                noteObj1.createTime < noteObj2.createTime;
            }));
            setShowStates(createState(notesData));
        })
    }, [])
    return (
        <div id='notes'>
            <div id='addNote'>
                <span onClick={() => {
                    let date = new Date();
                    let newNote = new NoteType('要做点什么呢', date.getTime());
                    let notes = notesData.concat();
                    notes.splice(0, 0, newNote);
                    setNotesData(notes);
                    setNotes(notes);
                    console.log(notes);
                }}>Add a note</span>
            </div>
            {notesData.map((noteObj, index) => {
                let show = showStates[noteObj.createTime];
                return (
                    <div className='note' key={noteObj.createTime}>
                        {/* //点击改变对应note的显示状态 */}
                        <div className='noteBar'>
                            <div>
                                <img
                                    src={rightIcon}
                                    className={show ? 'right-down' : 'down-right'}
                                    onClick={() => {
                                        let newData = {};
                                        //函数的显隐性关系
                                        Object.assign(newData, showStates)
                                        newData[noteObj.createTime] = !newData[noteObj.createTime];
                                        setShowStates(newData);
                                    }}
                                />
                                <input
                                    type='text'
                                    className={(show ? 'active' : 'inactive') + ' noteNameInput'}
                                    defaultValue={noteObj.taskName}
                                    id={noteObj.createTime}
                                    onBlur={(e) => {
                                        if (e.target.value == e.target.defaultValue) {
                                            return;
                                        }
                                        let date = new Date();
                                        let notes = notesData.concat();
                                        let newNoteObj = {};
                                        Object.assign(newNoteObj, noteObj)
                                        newNoteObj.taskName = e.target.value;
                                        newNoteObj.createTime = date.getTime();
                                        notes[index] = newNoteObj;
                                        setNotes(notes);
                                        setNotesData(notes);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key == 'Enter') {
                                            if (e.target.value == e.target.defaultValue) {
                                                return;
                                            }
                                            let date = new Date();
                                            let notes = notesData.concat();
                                            let newNoteObj = {};
                                            Object.assign(newNoteObj, noteObj)
                                            newNoteObj.taskName = e.target.value;
                                            newNoteObj.createTime = date.getTime();
                                            notes[index] = newNoteObj;
                                            setNotes(notes);
                                            setNotesData(notes);
                                        }
                                    }}
                                />
                            </div>
                            <img src={addIcon} onClick={() => {
                                let date = new Date();
                                let newShowState = deepCopy(showStates);
                                newShowState[noteObj.createTime] = true;
                                setShowStates(newShowState);
                                let newNotesData = deepCopy(notesData);
                                let newTaskList = new TaskList("uh", date.getTime());
                                console.log(date.getTime());
                                newNotesData[index].lists.unshift(newTaskList);
                                setNotes(newNotesData);
                                setNotesData(newNotesData);
                                setTimeout(() => {
                                    let newInputElement = document.getElementById(date.getTime());
                                    newInputElement.focus();
                                },200);
                            }} />
                            <img src={minusIcon} onClick={() => {
                                // let notes = notesData.filter(note => note.createTime!=noteObj.createTime);
                                let notes = deepCopy(notesData);
                                notes.splice(index, 1);
                                deleteNote(noteObj.taskName, noteObj.createTime);
                                setNotesData(notes);
                            }} />
                        </div>
                        {/* //根据显示state返回结果 */}
                        {
                            show ?
                                (<ul>
                                    {noteObj.lists.map((list, index) => {
                                        return (
                                            <li key={list.updateDate}>
                                                <input
                                                    type='text'
                                                    className='noteNameInput'
                                                    id={list.updateDate}
                                                    defaultValue={list.content}
                                                    onBlur={(e) => {
                                                        if (e.target.value == e.target.defaultValue) {
                                                            return;
                                                        }
                                                        let date = new Date();
                                                        let notes = notesData.concat();
                                                        let newNoteObj = {};
                                                        Object.assign(newNoteObj, noteObj)
                                                        if (e.target.value == "") {
                                                            newNoteObj.lists.splice(index, 1);
                                                        } else {

                                                            newNoteObj.lists[index].content = e.target.value;
                                                            newNoteObj.lists[index].updateDate = date.getTime();
                                                        }
                                                        notes[index] = newNoteObj;
                                                        setNotes(notes);
                                                        setNotesData(notes);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key == 'Enter') {
                                                            if (e.target.value == e.target.defaultValue) {
                                                                return;
                                                            }
                                                            let date = new Date();
                                                            let notes = notesData.concat();
                                                            let newNoteObj = {};
                                                            Object.assign(newNoteObj, noteObj)
                                                            if (e.target.value == "") {
                                                                newNoteObj.lists.splice(index, 1);
                                                            } else {

                                                                newNoteObj.lists[index].content = e.target.value;
                                                                newNoteObj.lists[index].updateDate = date.getTime();
                                                            }
                                                            notes[index] = newNoteObj;
                                                            setNotes(notes);
                                                            setNotesData(notes);
                                                        }
                                                    }}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>)
                                :
                                null
                        }
                    </div>
                )

            })}
        </div>
    )
}

//创建一个creatime和showstate的键值表
function createState(data) {
    let result = {};
    data.forEach(obj => {
        result[obj.createTime] = false;
    })
    return result;
}


// {
//     taskName:'react学习',
//     createTime: 1667742887426,
//     lists:[
//         {
//             ...new TaskList('学习Context', 1667743367562)
//         },
//         {
//             ...new TaskList('学习redux', 1667743367562)
//         },
//     ]
// },
