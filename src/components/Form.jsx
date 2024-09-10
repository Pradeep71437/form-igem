import React, { useState, useCallback } from 'react';
import html2canvas from 'html2canvas';

const Form = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleShare = useCallback(async () => {
    try {
      // Save the current body styles
      const originalStyles = {
        height: document.body.style.height,
        overflow: document.body.style.overflow,
      };

      // Temporarily adjust the body to show all content
      document.body.style.height = 'auto';
      document.body.style.overflow = 'visible';

      // Take screenshot of the entire webpage
      const canvas = await html2canvas(document.body, {
        logging: false,
        useCORS: true,
        allowTaint: true,
        height: document.body.scrollHeight,
        windowHeight: document.body.scrollHeight,
      });

      // Restore original body styles
      document.body.style.height = originalStyles.height;
      document.body.style.overflow = originalStyles.overflow;

      const dataUrl = canvas.toDataURL('image/png');

      // Convert the data URL to a blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'screenshot.png', { type: 'image/png' });

      // Use Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: 'Check out my screenshot!',
          text: 'Here is a screenshot of my webpage.',
          files: [file],
        });
      } else {
        alert('Sharing is not supported on this browser. Please try another browser.');
      }
    } catch (error) {
      console.error('Error taking screenshot or sharing:', error);
    }
  }, []);

  return (
    <div className='py-10 flex flex-col gap-8 lg:flex-row'>
      <div className='flex flex-col gap-8 lg:w-3/5'>
        <div className='flex flex-col gap-2'>
          <h1 className='font-semibold'>What's your thought on Microplastics?</h1>
          <textarea
            name="thoughts"
            id="thoughts"
            placeholder='Enter your thoughts'
            className='w-full h-44 overflow-y-auto rounded-sm p-2 backdrop-blur-xl bg-white/40'
          />
        </div>
        
        <div className='flex flex-col gap-2'>
          <h1 className='font-bold'>How do you encounter Microplastics in your daily life?</h1>
          <textarea
            name="daily_life"
            id="daily_life"
            placeholder='Enter your thoughts'
            className='w-full h-44 overflow-y-auto rounded-sm p-2 backdrop-blur-xl bg-white/40'
          />
        </div>
      </div>
      
      <div className='flex flex-col gap-4 lg:w-2/5'>
        <h1>Upload image</h1>
        <label className='inline-block w-fit cursor-pointer px-4 py-2 bg-white/50 backdrop-blur-md text-black font-semibold rounded-md shadow-md transition duration-300 ease-in-out'>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className='hidden'
          />
          Choose Image
        </label>
        
        {selectedImage && (
          <div className=''>
            <img src={selectedImage} alt="Uploaded preview" className='w-[200px] h-auto rounded-md' />
          </div>
        )}
        <button
          onClick={handleShare}
          className='mt-4 px-6 py-2 bg-white/50 backdrop-blur-md text-black font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300 ease-in-out'
        >
          Submit and Share
        </button>
      </div>
    </div>
  );
};

export default Form;