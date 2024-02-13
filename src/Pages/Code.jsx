import React,{useState} from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


const Code = () => {
    const [formData,setFormData] = useState({
        filename : '',
        code : ''
    })
    const handleFormChange = (e)=>{
        setFormData({
            ...formData,[e.target.name]:e.target.value
        });
    }
    const handleFormSubmit = async()=>{
        const submissionId = uuidv4();
        try {
            const response = (await axios.post("http://localhost:3001/api/user/code/",
            {
                submissionId,
                fileName : formData.filename,
                code : formData.code
            }).data);
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <div className='code-page'>
          <div  style={{display:'flex',flexDirection:'column', width:'fit-content',gap:'10px'}} >
                <h1>Write Code</h1>
                <input  name='filename' type='text' placeholder='FileName' value={formData.filename} onChange={handleFormChange}/>
                <textarea  name='code' type='text' placeholder='Write code' value={formData.code} onChange={handleFormChange} rows={10} cols={10}/>
                <button onClick={handleFormSubmit} type='submit'>SUBMIT</button>
          </div>
        </div>
      )
}
export default Code;