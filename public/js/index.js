//console.log('SCRIPT INIT');
const socket = io()

/*socket.on('Wellcome', (data)=>{
    console.log(data)
    })*/

socket.on('message-all', (data) => {
    console.log(data)
    render(data)
    let chat = document.getElementById('caja')
    chat.scrollTop = chat.scrollHeight
})



const render = (data) => {
    const html = data.map(elem => {
        return (
            `<div>
            <strong>${elem.autor}</strong> dice <em>${elem.text}</em>
            </div>
            `
        )

    }).join('')
    document.getElementById('caja').innerHTML = html
}



const addMessage = () => {
    const msg = {
        autor: document.getElementById('name').value,
        text: document.getElementById('text').value
    }
    socket.emit('new-socio', msg)
    //console.log(msg);
    return false
}
