import localforage from "localforage";

export function TaskList(content, updateDate) {
    this.content = content;
    this.updateDate = updateDate;
}

export function fakeData(){
    return [
        {
            taskName:'react学习',
            createTime: 1667742887426,
            lists:[
                {
                    ...new TaskList('学习Context', 1667743367562)
                },
                {
                    ...new TaskList('学习redux', 1667743367588)
                },
            ]        
        },
        {
            taskName:'blog项目',
            createTime: 1667743586281,
            lists:[
                {
                    ...new TaskList('css样式', 1667743607384)
                },
                {
                    ...new TaskList('数据接口', 1667743618773)
                },
                {
                    ...new TaskList('组件结构优化', 1667743625784)
                },
            ]        
        }
    ]
}

export async function getNotes() {
    let notes = await localforage.getItem('notes');
    if(!notes) {
        notes = {};
        localforage.setItem('notes', notes);
    }
    return notes;
}

export async function setNote(taskName, createTime) {
    let notes = await getNotes();
    let newNote = {
        taskName,
        createTime,
        lists:[]
    }
    notes.unshift(newNote);
    localforage.setItem('notes', notes);
    return notes;
}

export async function deleteNote(taskName, createTime) {
    let notes = getNotes();
    notes.filter(note => note.taskName!=taskName&&note.createTime!=createTime);
    notes = notes.updateDate(notes, taskName, createTime);
    localforage.setItem('notes', notes);
}

function updateNoteTime(notes, taskName,createTime) {
    let newDate = new Date();
    let newNotes = notes;
    newNotes.map( note => {
        if(note.taskName == taskName && note.createTime == createTime) {
            note.createTime = newDate.getTime()
        }
    })
    return newNotes;
}

