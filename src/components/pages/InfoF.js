import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import camera from '../../assets/camera.png'
function InfoF() {
  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0])
  const [state, setState] = useState({})
  const inputHandle = (e) => {
    setState({
      ...state,

      [e.target.name]: e.target.value


    })}

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const [sliderValue] = useState(40);

  //does not allow going to the next step without filling of all fields
  const next = () => {
    if (formNo === 1 && state.selectedFile) {
      setFormNo(formNo + 1)
    }
    else if (formNo === 2 && state.age && (state.male || state.female || state.other) && state.sliderValue) {
      setFormNo(formNo + 1)
    } else {
      toast.error('Please fill up all input field')
    }
  }
  //going to the previous step
  const pre = () => {
    setFormNo(formNo - 1)
  }
  const finalSubmit = () => {
    if (state.citizenship && state.uniquehealthid && state.province && state.district && state.ward && state.city) {
      toast.success('form submit success')
    } else {
      toast.error('Please fill up all input field')
    }
  }
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center  bg-[#E6F4F9]">
      <ToastContainer />
      <div className="sm:h-[620px] sm:w-[600px] h-[535px] w-[350px] items-center rounded-sm border-[2px] border-[#f8f8f8] p-9 m-9 mt-4 mx-24 bg-white">
        <div className='flex justify-center items-center'>
          <h2 className='sm:text-[30px] text-[22px] font-bold  text-gray-700'>Fill in your information
          </h2>
        </div>
        <div className='flex justify-center items-center'>
          {
            formArray.map((v, i) => <><div className={`w-[35px] my-3 text-white rounded-full ${formNo - 1 === i || formNo - 1 === i + 1 || formNo === formArray.length ? 'bg-[#42ADF0]' : 'bg-slate-400'} h-[35px] flex justify-center items-center`}>
              {v}
            </div>
              {
                i !== formArray.length - 1 && <div className={`w-[85px] h-[2px] ${formNo === i + 2 || formNo === formArray.length ? 'bg-[#42ADF0]' : 'bg-slate-400'}`}></div>
              }
            </>)
          }
        </div>
        {
          formNo === 1 && <div>

            <div className='flex flex-col mb-2'>

              <div className='flex justify-center items-center'>
                {previewImage ? (
                  <img src={previewImage} alt="Selected Image" class="self-center h-[160px] p-5  mt-0 sm:mt-10 border border-gray-300  rounded-lg"/>
                ) : (
                  <img src={camera} alt="Placeholder Image" class="self-center h-[160px] p-5  mt-0 sm:mt-10 border border-gray-300  rounded-lg"/>
                )}
            
              </div>


              <label htmlFor="batch" className='mt-0 sm:mt-10'>Upload Photo</label>
              <input
                id="uploadInput"
                value={state.selectedFile}
                onChange={(event) => {
                  inputHandle(event);
                  handleFileChange(event);
                }}
                multiple={false}
                accept="image/*"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="file"
                name="selectedFile"
              />

            </div>



            <div className='mt-0 sm:mt-10 flex justify-center items-center'>
              <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-[#42ADF0]'>Next</button>
            </div>
          </div>
        }

        {
          formNo === 2 && <div>


            <div className='flex flex-col mt-0 sm:mt-4 mb-4 '>
              <label htmlFor="name">Enter Your Age:</label>
              <input value={state.age} onChange={inputHandle} className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5' type="number" name='age' placeholder='Enter your age' />
            </div>

            <div className='flex flex-col mb-4 '>
              <label  >Select Your Gender:</label>

              <div className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-500 block w-full  p-2.5'>

                <div className='text-base'>
                  <input type="radio" name="employeeStatus" name='male' value="male" checked={state.male} onChange={inputHandle} /> Male <br />
                  <input type="radio" name="employeeStatus" name='female' value="female" checked={state.female} onChange={inputHandle} /> Female <br />
                  <input type="radio" name="employeeStatus" name='other' value="other" checked={state.other} onChange={inputHandle} /> Other
                </div>
              </div>
            </div>

            <div className="flex flex-col mb-2  ">
              <label htmlFor="batch">Select Your Weight:</label>
              <div className="border border-gray-300 rounded-lg p-2.5">

                <input name='sliderValue' id='dept'
                  type="range"
                  min="0"
                  max="200"
                  value={state.sliderValue}
                  onChange={inputHandle}
                  className="w-full appearance-none h-3 rounded-full overflow-hidden bg-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                />
                <div className="flex justify-between">
                  <span>0</span>
                  <span>100</span>
                </div>
                <p className="text-center">{sliderValue}</p>
              </div>
            </div>

            <div className='mt-0 sm:mt-11 gap-3 flex justify-center items-center'>
              <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-[#42ADF0]'>Previous</button>
              <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-[#42ADF0]'>Next</button>
            </div>
          </div>
        }

        {
          formNo === 3 && <div>

            <div className='flex flex-col mt-0 sm:mt-4 mb-2'>
              <label htmlFor="name">Citizenship Number:</label>
              <input value={state.citizenship} onChange={inputHandle} className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5' type="number" name='citizenship' placeholder='Enter your citizenship number' />
            </div>

            <div className='flex flex-col mb-2'>
              <label htmlFor="name">Unique Health Id:</label>
              <input value={state.uniquehealthid} onChange={inputHandle} className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5' type="number" name='uniquehealthid' placeholder='Enter your Unique Health Id' />
            </div>

            <div className='flex flex-col mb-4 '> Location:
              <div className='flex flex-wrap justify-center items-center bg-white p-2 text-center w-full '>


                <div className='text-base w-1/2 '>
                  <div className=' sm:mb-4 sm:mr-4 mb-3 mr-1 border border-gray-300 rounded-lg' >
                    Province:
                    <div className='text-base   '>
                      <select className='border border-blue-500 rounded-lg pb-1 mb-2 bg-[#e5f5ff7f]' name='loaction' value={state.province} onChange={inputHandle}  >
                        <option value="">&nbsp;&nbsp;&nbsp;------</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className='text-base w-1/2 '>
                  <div className='sm:mb-3 sm:ml-4 mb-3 mr-0  border border-gray-300 rounded-lg' >
                    District:
                    <div className='text-base   '>
                      <select className='border border-blue-500 rounded-lg pb-1 mb-2 bg-[#e5f5ff7f]' name='loaction' value={state.district} onChange={inputHandle}  >
                        <option value="">&nbsp;&nbsp;&nbsp;------</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className='text-base w-1/2 '>
                  <div className='sm:mt-4 sm:mr-4 mb-3 mr-0  border border-gray-300 rounded-lg' >
                    Ward:
                    <div className='text-base   '>
                      <select className='border border-blue-500 rounded-lg pb-1 mb-2 bg-[#e5f5ff7f]' name='loaction' value={state.ward} onChange={inputHandle}  >
                        <option value="">&nbsp;&nbsp;&nbsp;------</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className='text-base w-1/2 '>
                  <div className='sm:mt-4 sm:ml-4 mb-3 mr-0  border border-gray-300 rounded-lg' >
                    City:
                    <div className='text-base   '>
                      <select className='border border-blue-500 rounded-lg pb-1 mb-2 bg-[#e5f5ff7f]' name='loaction' value={state.city} onChange={inputHandle}  >
                        <option value="">&nbsp;&nbsp;&nbsp;------</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                      </select>
                    </div>
                  </div>
                </div>




              </div>
            </div>
            <div className='mt-4 gap-3 flex justify-center items-center'>
              <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-[#42ADF0]'>Previous</button>
              <button onClick={finalSubmit} className='px-3 py-2 text-lg rounded-md w-full text-white bg-[#42ADF0]'>Submit</button>
            </div>
          </div>
        }

      </div>
    </div>
  );
}

export default InfoF;