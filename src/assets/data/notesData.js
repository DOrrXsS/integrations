export default function fakeData(){
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

function TaskList(content, updateDate) {
    this.content = content;
    this.updateDate = updateDate;
}