import React, { useEffect, useState } from 'react'
import ServerCall from './ServerCall'
export const Student = () => {
    const [formData,setFormData]=useState({name: "", gender: "", hobbies: "", country: "", address: ""})
    const [students,setStudents]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const [isEdit,setIsEdit]=useState(false)
    useEffect(()=>{
       getStudents()
    },[])
    const getStudents=()=>{
     
      ServerCall.sendGetReq('std/get')
      .then((res)=>{
         setStudents(res.data)
      })
      .catch((res)=>{
        setStudents([])
      })
    }
    const fnRegister=()=>{
      const {name,gender,hobbies,country,address}=formData
        if(name=='' || gender == '' || hobbies=='' || country== '' || address==''){
          alert('Please Enter Input values')
          return;
        }
        setIsLoading(true)
        ServerCall.sendPostReq('std/reg',{data:formData})
        .then((res)=>{
             const {acknowledged,insertedId}=res.data
             if(acknowledged && insertedId){
              setIsLoading(false)
              getStudents()
              alert('Inserted successfully')
              setFormData({name: "", gender: "", hobbies: "", country: "", address: ""})
             }else{
              alert('Not Inserted, try again')
              setIsLoading(false)
             }
        })
        .catch((res)=>{
            alert(res.data)
            setIsLoading(false)
        })
    }
   const fnChange=(eve)=>{
       const {name,value,type,checked,id}= eve.target
       if(type=='checkbox'){
            let selHobbies=formData.hobbies ? formData.hobbies.split(",") :[]
            if(checked){
                selHobbies.push(id)
            }else{
                selHobbies.splice(selHobbies.indexOf(id),1)
            }
            setFormData({
                ...formData,
                [name]:selHobbies.join()
               })
       }else{
       setFormData({
        ...formData,
        [name]:value
       })
    }
   }
   const fnEdit=(obj)=>{
      setIsEdit(true)
      setFormData(obj)
   }
   const fnDelete=(obj)=>{
       const isOk=window.confirm('R u sure...')
       if(isOk){
          ServerCall.sendDelReq(`std/delete?id=${obj._id}`)
          .then((res)=>{
            const {acknowledged,deletedCount}=res.data
            if(acknowledged && deletedCount){
              alert('Successfully deleted');
            
              getStudents()
            
            }else{
              alert('Not deleted, try again')
            }
          })
          .catch(()=>{
              alert('Something went wrong')
          })
       }
   }
   const fnUpdate=()=>{
    const {name,gender,hobbies,country,address}=formData
    if(name=='' || gender == '' || hobbies=='' || country== '' || address==''){
      alert('Please Enter Input values')
      return;
    }
    setIsLoading(true)
       ServerCall.sendPutReq(`std/update/${formData._id}`,{data:formData})
       .then((res)=>{
        const {acknowledged,modifiedCount}=res.data
        setIsLoading(false)
        if(acknowledged && modifiedCount){
          alert('Successfully updated');
          getStudents()
          fnCancel()
        }else{
          alert('Not updated, try again')
        }
      })
      .catch(()=>{
        setIsLoading(false)
          alert('Something went wrong')
      })
   }
   const fnCancel=()=>{
     setIsEdit(false)
     setFormData({name: "", gender: "", hobbies: "", country: "", address: ""})
   }
  return (
    <div>
        <h1 className='text-center bg-primary py-3 mb-5 text-white'>Student Form</h1>
        <div className='container-fluid'>
             <div className='row mb-4'>
                  <div className='col-sm-5 text-end'>
                    <b>Name:</b>
                  </div>
                  <div className='col-sm-3'>
                    <input value={formData.name} onChange={fnChange} name="name" type='text' className='form-control' />
                  </div>
             </div>
             <div className='row mb-4'>
                  <div className='col-sm-5 text-end'>
                    <b>Gender:</b>
                  </div>
                  <div className='col-sm-3 text-start'>
                    <input checked={formData.gender == 'M'} onChange={fnChange} value='M' type='radio' name='gender' />Male
                    <input checked={formData.gender == 'F'}  onChange={fnChange} value="F" className='ms-3' type='radio' name='gender' />Female

                  </div>
             </div>
             <div className='row mb-4'>
                  <div className='col-sm-5 text-end'>
                    <b>Hobbies:</b>
                  </div>
                  <div className='col-sm-3 text-start'>
                    <input checked={formData.hobbies.includes('Cric')} onChange={fnChange} id='Cric' name='hobbies' type='checkbox'  />Cricket
                    <input checked={formData.hobbies.includes('Hoc')}onChange={fnChange} id='Hoc' name='hobbies' className='ms-3' type='checkbox'  />Hockey
                    <input checked={formData.hobbies.includes('Fb')} onChange={fnChange} id="Fb" name='hobbies' className='ms-3' type='checkbox'  />FootBall
                  </div>
             </div>
             <div className='row mb-4'>
                  <div className='col-sm-5 text-end'>
                    <b>Country:</b>
                  </div>
                  <div className='col-sm-3 text-start'>
                    <select  name='country' className='form-control'  onChange={fnChange}>
                        <option selected={formData.country==''} >Please Select</option>
                            <option selected={formData.country=='Ind'} value="Ind">India</option>
                            <option selected={formData.country=='Pak'} value="Pak">Pakistan</option>
                            <option selected={formData.country=='Chi'}value="Chi">China</option>

                    </select>
                  </div>
             </div>
             <div className='row mb-4'>
                  <div className='col-sm-5 text-end'>
                    <b>Address:</b>
                  </div>
                  <div className='col-sm-3'>
                     <textarea value={formData.address}  onChange={fnChange} name='address' className='form-control'></textarea>
                  </div>
             </div>
             <div className='row mb-4'>
                
                  <div className='offset-sm-5 col-sm-3 text-start'>
                    {
                      isEdit ?
                      <>
                    <button disabled={isLoading} onClick={fnUpdate} className='btn btn-primary me-3'><span>{isLoading ? 'Loading...'  : 'Update'}</span></button>
                    <button onClick={fnCancel} className='btn btn-primary'><span>Cancel</span></button>
                      
                      </>
                      :
                      <>
                      <button disabled={isLoading} onClick={fnRegister} className='btn btn-primary'><span>{isLoading ? 'Loading...'  : 'Register'}</span></button>
                      
                      </>
                    }
                  </div>
             </div>
        </div>
{
  students.length > 0 ?

<div className='table-responsive'>
  <table className='table table-bordered table-hover table-stripped'>
         <thead>
             <tr>
              <th>ID</th><th>NAME</th><th>GENDER</th><th>HOBBIES</th><th>COUNTRY</th><th>ADDRESS</th>
              <th>Edit</th>
              <th>Delete</th>
             </tr>
         </thead>
         <tbody>
              {
                students.map((obj,index)=>{
                    const {_id,name,gender,hobbies,country,address}=obj
                    return <tr key={index}>
                        <td>{_id}</td><td>{name}</td><td>{gender}</td>
                        <td>{hobbies}</td><td>{country}</td>
                        <td>{address}</td>
                        <td><button onClick={()=>fnEdit(obj)} className='btn btn-primary'>Edit</button></td>
                        <td><button onClick={()=>fnDelete(obj)} className='btn btn-primary'>Delete</button></td>
                    </tr>
                })
              }
         </tbody>
  </table>
</div>

:
<h1>No Data</h1>
}
     
        
    </div>
  )
}
