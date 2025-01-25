import React, {useState,useEffect} from 'react'
import { supabase } from './assets/createClient'
import './App.css'
export default function App() {

  const[users, setUsers] = useState([])


  //soring the details from onChange event 
  const[user, setUser] = useState({
    name:'',
    age:''
  })


  //if i load the page then it will bi run the function 
  useEffect(() => {
    fetchUsers()
  }, [])
  console.log(user);


// takeing the data from data base and printing it into an web page 
async function fetchUsers(){
  const {data} = await supabase
        .from('users')
        .select('*')
        setUsers(data)
}


//input fild logic
function handelChange(event){
  setUser(prevFormData => {
    return {
      ...prevFormData,
      [event.target.name]:event.target.value
    }
  }) 
}
// button link when ever we submit the form then we can directly send the data to the front end show case 
async function createUser(event){
  // event.preventDefault() 
  await supabase
  .from('users')
  .insert({name: user.name, age: user.age})
  fetchUsers()
}

// if we want to get the data from back end and send the data to back end these upper methods are good to go 

async function deleteUser(userId) {
  const {data, error} = await supabase
  .from('users')
  .delete()
  .eq('id',userId)
  fetchUsers()


  if(error) {
    console.log(error)
  }
  if(data){
    console.log(data)
  }
}

// delete function Endes here 

// edit function starts here

const [user2 , setUser2] = useState({
  id:'',name:'',age:''
})

async function displayUser(userId){
  users.map((user) =>{
    if(user.id == userId) {

      setUser2({id:user.id,name:user.name, age:user.age})
    }
})
}
console.log(user2)

function handelChange2(event){
  setUser2(prevFormData => {
    return {
      ...prevFormData,
      [event.target.name]:event.target.value
    }
  }) 
}


async function updateUser(userId){
      const{error} = await supabase
      .from('users')
      .update({
        id:user2.id,name:user2.name, age:user2.age
      })

      .eq('id',userId)
      
      fetchUsers()

      if(error) {
        console.log(error)
      }
      if(data){
        console.log(data)
      }
}




  return (
    <>

      <h1 >Fetching The Data </h1>
      <div className='tab1'>
{/*                                            form starts here                                      */}
        <form onSubmit={createUser}>
            <input 
            type="text"
            placeholder="Enter Your full name "
            name="name"
            onChange={handelChange}
            />

            <input 
            type="number"
            placeholder="Enter Your AGE "
            name="age"
            onChange={handelChange}
            />

            <button type='submit'>Click Here</button>

        </form>

        {/* //over 2nd input fileds */}
        <form onSubmit={() =>updateUser(user2.id)}>
            <input 
            type="text"
            name="name"
            onChange={handelChange2}
            defaultValue={user2.name}
            />

            <input 
            type="number"
            name="age"
            onChange={handelChange2}
            defaultValue={user2.age}
            />

            <button type='submit'>Save Change</button>

        </form>
{/*                                            form is endding here                                */}

{/*                                         Table starts from here                                 */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>AGE</th>
              <th>Buttons</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>
                        <button onClick={() => {
                            deleteUser(user.id)
                      }}>Delete</button>

                        <button onClick={() => {
                            displayUser(user.id)
                      }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/*                                     form end here                             */}
      </div>
    </>
  )
}
