const deleteButton = document.querySelector('#delete-button')
const trainNumber=document.querySelector('#trainNumber')
const update = document.querySelector('#update-button')
const train_duration=document.querySelector('#train_duration')
const source_location=document.querySelector('#source_location')
const destination_location=document.querySelector('#destination_location')
const date_r=document.querySelector('#date_r')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
  fetch('/delete', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      
      train_number: trainNumber.value
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      if (response === 'No quote to delete') {
        messageDiv.textContent = 'No Darth Vadar quote to delete'
      } else {
        window.location.reload(true)
      }
    })
  .catch(console.error)
})
update.addEventListener('click', _ => {
  fetch('/update', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      train_number: trainNumber.value,
      train_duration: train_duration.value,
      source_location: source_location.value,
      destination_location: destination_location.value,
      date_r: date_r.value
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      window.location.reload(true)
    })
})