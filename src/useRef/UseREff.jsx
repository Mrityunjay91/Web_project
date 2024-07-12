 import React, { useRef } from 'react'
 
 const UseREff = () => {

    const inputRef = useRef()
    const PRef = useRef()

    const inputdata  =()=>{
        inputRef.current.value='abcd'
        inputRef.current.focus()
        inputRef.current.style.background='red '
        inputRef.current.style.padding='10px'
        
    }
    const change  =()=>{
       
         // Set the innerHTML of the paragraph
         PRef.current.innerHTML = 'New image selected';
   
    }
   return (
     <div>
        
        <button onClick={change}>get data</button>
        <p ref={PRef}>old value</p>
        <input ref={inputRef} type="text" placeholder='enter you name' /> </div>
   )
 }
 
 export default UseREff




// import React, { useRef, useState } from 'react';

// const ImageUploader = () => {
//   const [imageSrc, setImageSrc] = useState(null);
//   const inputRef = useRef(null);
//   const imgRef = useRef(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setImageSrc(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleButtonClick = () => {
//     inputRef.current.click();
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         accept="image/*"
//         ref={inputRef}
//         style={{ display: 'none' }}
//         onChange={handleImageChange}
//       />
//       <button onClick={handleButtonClick}>Select Image</button>
//       <div style={{ marginTop: '20px' }}>
//         {imageSrc && (
//           <img
//             ref={imgRef}
//             src={imageSrc}
//             alt="Selected"
//             style={{ maxWidth: '100%', maxHeight: '300px' }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageUploader;
