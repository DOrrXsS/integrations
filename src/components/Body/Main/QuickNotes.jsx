import React from 'react';
import { useState } from 'react';
import fakeData from '../../../assets/data/notesData';
import addIcon from '../../../assets/imgs/icons/add.svg';

export default function QuickNotes() {
    let notesData = fakeData();
    let [showStates, setShowStates] = useState(
        createState(notesData)
    );
    console.log(showStates)
    return (
        <div id='notes'>
            {notesData.map(noteObj => {
                return (
                    <div className='note' key={noteObj.createTime}>
                        {/* //点击改变对应note的显示状态 */}
                        <div className='noteBar' onClick={() => {
                            let newData = {};
                            Object.assign(newData, showStates)
                            newData[noteObj.createTime] = !newData[noteObj.createTime];
                            setShowStates(newData);
                        }}>
                            <span className={showStates[noteObj.createTime] ? 'active' : 'inactive'}>{noteObj.taskName}</span>
                            <img src={addIcon} />
                        </div>
                        {/* //根据显示state返回结果 */}
                        {
                            showStates[noteObj.createTime] ?
                                (<ul>
                                    {noteObj.lists.map(list => {
                                        return (
                                            <li key={list.updateDate}>
                                                {list.content}
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
