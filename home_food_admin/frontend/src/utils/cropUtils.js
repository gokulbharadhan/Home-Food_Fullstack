export const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // Avoid CORS issues
        image.src = url;
    });

    export const getCroppedImg = async (imageSrc, crop) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
    
        // Calculate the correct scaling factors
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
    
        // Set canvas dimensions based on crop dimensions
        canvas.width = crop.width;
        canvas.height = crop.height;
    
        // Draw the cropped image on the canvas
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
    
                // Create a URL for the Blob
                const croppedImageUrl = window.URL.createObjectURL(blob);
    
                // Resolve with the Blob URL
                resolve(croppedImageUrl);
            }, 'image/jpeg', 1); // Ensure high quality
        });
    };
    