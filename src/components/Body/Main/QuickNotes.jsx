import React from 'react';
import { useState } from 'react';
import {fakeData} from '../../../assets/data/notesData';
import addIcon from '../../../assets/imgs/icons/add.svg';
import minusIcon from '../../../assets/imgs/icons/minus.svg';
import rightIcon from '../../../assets/imgs/icons/right.svg';

export default function QuickNotes() {
    let notesData = fakeData();
    let [showStates, setShowStates] = useState(
        createState(notesData)
    );
    return (
        <div id='notes'>
            {notesData.map(noteObj => {
                let show = showStates[noteObj.createTime];
                return (
                    <div className='note' key={noteObj.createTime}>
                        {/* //点击改变对应note的显示状态 */}
                        <div className='noteBar' onClick={() => {
                            let newData = {};
                            Object.assign(newData, showStates)
                            newData[noteObj.createTime] = !newData[noteObj.createTime];
                            setShowStates(newData);
                        }}>
                            <div>
                                <img src={rightIcon} className={show? 'right-down': 'down-right'}/>
                                <span className={show ? 'active' : 'inactive'}>{noteObj.taskName}</span>
                            </div>
                            <img src={addIcon} />
                            <img src={minusIcon} />
                        </div>
                        {/* //根据显示state返回结果 */}
                        {
                            show ?
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
