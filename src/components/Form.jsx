import React, { useState, useCallback } from 'react';
import { jsPDF } from 'jspdf';

const Form = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [thoughts, setThoughts] = useState('');
  const [dailyLife, setDailyLife] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleShare = useCallback(async () => {
    try {
      // Create a new PDF document
      const pdf = new jsPDF();

      // Add text content from form responses
      pdf.setFontSize(16);
      pdf.text("What's your thought on Microplastics?", 10, 10);
      pdf.setFontSize(12);
      pdf.text(thoughts, 10, 20);

      pdf.setFontSize(16);
      pdf.text('How do you encounter Microplastics in your daily life?', 10, 40);
      pdf.setFontSize(12);
      pdf.text(dailyLife, 10, 50);

      // Check if an image is selected
      if (selectedImage) {
        // Fetch the image as a blob and read it as a data URL
        const img = await fetch(selectedImage);
        const blob = await img.blob();
        const reader = new FileReader();
        
        reader.onloadend = async () => {
          // Add the image to the PDF once it is fully loaded
          pdf.addImage(reader.result, 'JPEG', 10, 70, 50, 50); // Adjust positioning and size as needed

          // Save and share the PDF
          const pdfBlob = pdf.output('blob');
          const pdfFile = new File([pdfBlob], 'responses.pdf', { type: 'application/pdf' });

          // Share the PDF using Web Share API if available
          if (navigator.share) {
            await navigator.share({
              title: 'Check out my PDF!',
              text: 'Here is a PDF of my form responses.',
              files: [pdfFile],
            });
          } else {
            pdf.save('responses.pdf');
          }
        };
        
        // Convert blob to data URL
        reader.readAsDataURL(blob);
      } else {
        // Save and share the PDF if no image is included
        const pdfBlob = pdf.output('blob');
        const pdfFile = new File([pdfBlob], 'responses.pdf', { type: 'application/pdf' });

        if (navigator.share) {
          await navigator.share({
            title: 'Check out my PDF!',
            text: 'Here is a PDF of my form responses.',
            files: [pdfFile],
          });
        } else {
          pdf.save('responses.pdf');
        }
      }
    } catch (error) {
      console.error('Error generating PDF or sharing:', error);
    }
  }, [thoughts, dailyLife, selectedImage]);

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
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
          />
        </div>
        
        <div className='flex flex-col gap-2'>
          <h1 className='font-bold'>How do you encounter Microplastics in your daily life?</h1>
          <textarea
            name="daily_life"
            id="daily_life"
            placeholder='Enter your thoughts'
            className='w-full h-44 overflow-y-auto rounded-sm p-2 backdrop-blur-xl bg-white/40'
            value={dailyLife}
            onChange={(e) => setDailyLife(e.target.value)}
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
